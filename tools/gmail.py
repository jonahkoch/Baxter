#!/usr/bin/env python3
"""Gmail IMAP client for OpenClaw"""
import imaplib
import smtplib
import ssl
import email
from email.header import decode_header
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
import sys

CONFIG_PATH = os.path.expanduser("~/.openclaw/workspace/config/gmail.json")

def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)

class GmailClient:
    def __init__(self):
        self.cfg = load_config()
        self.imap = None

    def connect_imap(self):
        context = ssl.create_default_context()
        self.imap = imaplib.IMAP4_SSL(self.cfg['imap_server'], self.cfg['imap_port'], ssl_context=context)
        self.imap.login(self.cfg['account'], self.cfg['app_password'])
        return self

    def get_unread_count(self):
        self.imap.select('inbox')
        status, messages = self.imap.search(None, 'UNSEEN')
        return len(messages[0].split())

    def get_recent_emails(self, n=10, unread_only=False):
        self.imap.select('inbox')
        criteria = 'UNSEEN' if unread_only else 'ALL'
        status, messages = self.imap.search(None, criteria)
        msg_ids = messages[0].split()
        recent = msg_ids[-n:] if len(msg_ids) > n else msg_ids

        emails = []
        for msg_id in reversed(recent):
            status, msg_data = self.imap.fetch(msg_id, '(RFC822)')
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)

            subject = self._decode_header(msg["Subject"])
            from_addr = self._decode_header(msg["From"])
            date = msg["Date"]
            message_id = msg["Message-ID"] or msg_id.decode()

            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        payload = part.get_payload(decode=True)
                        if payload:
                            body = payload.decode('utf-8', errors='ignore')
                            break
            else:
                payload = msg.get_payload(decode=True)
                if payload:
                    body = payload.decode('utf-8', errors='ignore')

            emails.append({
                'id': message_id,
                'subject': subject,
                'from': from_addr,
                'date': date,
                'body': body[:1000] + "..." if len(body) > 1000 else body
            })

        return emails

    def send_email(self, to, subject, body):
        context = ssl.create_default_context()
        with smtplib.SMTP(self.cfg['smtp_server'], self.cfg['smtp_port']) as server:
            server.starttls(context=context)
            server.login(self.cfg['account'], self.cfg['app_password'])

            msg = MIMEMultipart()
            msg['From'] = self.cfg['account']
            msg['To'] = to
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'plain'))

            server.send_message(msg)
        return True

    def _decode_header(self, header):
        if not header:
            return ""
        decoded = decode_header(header)
        result = ""
        for part, charset in decoded:
            if isinstance(part, bytes):
                result += part.decode(charset or 'utf-8', errors='ignore')
            else:
                result += str(part)
        return result

    def logout(self):
        if self.imap:
            self.imap.logout()


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['unread', 'recent', 'send'])
    parser.add_argument('--to', help='Recipient for send')
    parser.add_argument('--subject', help='Subject for send')
    parser.add_argument('--body', help='Body for send')
    parser.add_argument('--n', type=int, default=5, help='Number of emails to fetch')
    args = parser.parse_args()

    client = GmailClient().connect_imap()

    try:
        if args.action == 'unread':
            count = client.get_unread_count()
            print(f"Unread emails: {count}")

        elif args.action == 'recent':
            emails = client.get_recent_emails(args.n)
            print(json.dumps(emails, indent=2))

        elif args.action == 'send':
            if not all([args.to, args.subject, args.body]):
                print("Error: --to, --subject, and --body required for send")
                sys.exit(1)
            client.send_email(args.to, args.subject, args.body)
            print(f"Email sent to {args.to}")

    finally:
        client.logout()


if __name__ == '__main__':
    main()
