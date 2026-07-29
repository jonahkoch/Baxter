#!/usr/bin/env python3
"""
Obscura Puppeteer/Playwright automation template.

This module provides a Python interface for CDP-based browser automation
using Obscura as the backend. Requires `pip install playwright` or `pip install puppeteer`.

Usage:
    from obscura_automation import ObscuraAutomation
    
    with ObscuraAutomation(stealth=True) as browser:
        page = browser.new_page()
        page.goto("https://example.com")
        title = page.eval("document.title")
        print(title)
"""

import subprocess
import time
import json
import requests
from typing import Optional, Dict, Any, List
from contextlib import contextmanager


class ObscuraPage:
    """Represents a single browser page/tab."""
    
    def __init__(self, browser_ws_url: str, target_id: str):
        self.browser_ws_url = browser_ws_url
        self.target_id = target_id
        self.session_id: Optional[str] = None
    
    def goto(self, url: str, wait_until: str = "load"):
        """Navigate to a URL."""
        # Simplified - in practice would use CDP protocol
        pass
    
    def eval(self, expression: str) -> Any:
        """Evaluate JavaScript in the page context."""
        # Simplified - would send Runtime.evaluate CDP command
        pass
    
    def query_selector(self, selector: str) -> Optional[Dict]:
        """Query for an element."""
        pass
    
    def click(self, selector: str):
        """Click an element."""
        pass
    
    def type(self, selector: str, text: str):
        """Type text into an input."""
        pass
    
    def get_html(self) -> str:
        """Get page HTML."""
        pass
    
    def close(self):
        """Close the page."""
        pass


class ObscuraAutomation:
    """
    High-level automation interface for Obscura.
    
    Manages the Obscura server process and provides a Puppeteer-like API.
    """
    
    def __init__(self, port: int = 9222, stealth: bool = False, 
                 proxy: Optional[str] = None):
        self.port = port
        self.stealth = stealth
        self.proxy = proxy
        self.server_process: Optional[subprocess.Popen] = None
        self.ws_url: Optional[str] = None
        self.pages: List[ObscuraPage] = []
    
    def start(self) -> bool:
        """Start the Obscura server."""
        cmd = ["obscura", "serve", "--port", str(self.port)]
        
        if self.stealth:
            cmd.append("--stealth")
        if self.proxy:
            cmd.extend(["--proxy", self.proxy])
        
        try:
            self.server_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            # Wait for server to be ready
            time.sleep(1)
            
            # Get WebSocket URL from /json/version endpoint
            try:
                resp = requests.get(f"http://127.0.0.1:{self.port}/json/version", timeout=5)
                if resp.status_code == 200:
                    data = resp.json()
                    self.ws_url = data.get("webSocketDebuggerUrl")
            except:
                pass
            
            return self.server_process.poll() is None
            
        except FileNotFoundError:
            raise RuntimeError("obscura not found. Install from https://github.com/h4ckf0r0day/obscura")
    
    def stop(self):
        """Stop the Obscura server."""
        for page in self.pages:
            page.close()
        
        if self.server_process:
            self.server_process.terminate()
            try:
                self.server_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.server_process.kill()
    
    def new_page(self) -> ObscuraPage:
        """Create a new page/tab."""
        # In practice, would send Target.createTarget CDP command
        page = ObscuraPage(self.ws_url or "", "")
        self.pages.append(page)
        return page
    
    def __enter__(self):
        self.start()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.stop()


def example_login_flow():
    """Example: Automate a login flow."""
    with ObscuraAutomation(stealth=True) as browser:
        page = browser.new_page()
        
        # Navigate to login page
        page.goto("https://example.com/login")
        
        # Fill credentials
        page.type("#username", "myuser")
        page.type("#password", "mypassword")
        
        # Submit form
        page.click("button[type='submit']")
        
        # Get content after login
        html = page.get_html()
        print(f"Logged in. Page length: {len(html)}")
        
        page.close()


def example_extract_data():
    """Example: Extract structured data from a page."""
    with ObscuraAutomation(stealth=True) as browser:
        page = browser.new_page()
        page.goto("https://news.ycombinator.com")
        
        # Extract stories using JavaScript
        stories = page.eval("""
            Array.from(document.querySelectorAll('.titleline > a'))
                .map(a => ({ title: a.textContent, url: a.href }))
        """)
        
        print(json.dumps(stories, indent=2))
        page.close()


if __name__ == "__main__":
    print("Obscura Automation Module")
    print("Import this module to use in your scripts")
    print()
    print("Example:")
    print("  from obscura_automation import ObscuraAutomation")
    print("  with ObscuraAutomation() as browser:")
    print("      page = browser.new_page()")
    print("      page.goto('https://example.com')")
