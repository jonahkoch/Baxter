# Timed Work Sessions

Use a timed session when the player asks to keep doing profession work. The
worker starts the coordinator's existing work loop, renews control, records XP,
and confirms stopping. It does not select sources, change professions, sell
items, or replace another activity. Resource access remains subject to the
coordinator's level, route, reservation, and depletion checks.

## Run

Connect to the selected agent with the normal control helper. Check that its live
profession matches the player's request. Use the player's
duration, or agree on a duration before starting an open-ended request.

```sh
node scripts/mcity-control.mjs connect <agentId>
node scripts/mcity-work.mjs run 1h
```

Durations use positive whole seconds, minutes, or hours: `30s`, `10m`, `1h`.
Run the second command with the host's managed background process support.
The command remains active until the session ends. Preserve its process handle,
JSON output, and exit result. The script requires the observer to return the
boolean `agent.isPerformingJob`; it fails clearly if that field is absent.

The worker retries a rejected start caused by unavailable resources at about
30-second intervals. It reads pending starts more often. It sends no more work
requests after the server enables its loop. Normal state and XP reads occur
about every 30 seconds. Lease renewal uses the interval returned by the server.

One worker can run per control configuration. Use separate installations or
the existing `MCITY_AGENT_ID` setting for separate agents. Stop the worker
before connecting that configuration to another agent. If another controller
takes control, the worker exits without claiming the replacement session.

## Check and stop

```sh
node scripts/mcity-work.mjs status
node scripts/mcity-work.mjs stop
```

`status` reads the saved observation and checks the local worker process. It
does not make a server request. Check `workerAlive`, `state`, `observationAgeMs`,
`lastHeartbeatAt`, `lastXpCheckedAt`, `lastProgressAt`, and `xpGained` together. `isPerformingJob`
is the last observed server value, not a fresh query. A worker can be alive
while resources are busy or a request fails. Stale observations are not proof
of current work or current XP. A dead worker is reported as `worker_exited`.

The worker emits JSON lines when state, reason, or XP changes. The host must
deliver any promised player notifications. Report verified XP gains and useful
changes; do not send repeated unchanged status messages. Do not infer the number
of completed resource pulls from the number of start requests.

At the duration limit, a stop request, SIGINT, or SIGTERM, the worker confirms
server stopping before releasing control. A stop can take longer than the
duration while requests finish. Exit code zero means the session ended with a
confirmed stopped state. A nonzero exit requires inspection of the saved result.
An external action or profession change ends supervision without replacing that
action or taking control back.

A killed process or a failed host cannot guarantee a server stop at the deadline.
Use `stop` after a worker crash to check and stop its server work while the same
control session is still valid. If control expired or changed, inspect live
context and connect through the normal workflow before using `stop-work`.
Never report that work stopped merely because the local process exited.

The worker stores private status and lock files under `~/.midnight-city`, scoped
to the installation and control configuration. Status contains no API or lease
token. No additional environment variables or scheduler installation are needed.
