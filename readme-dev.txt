-Run this: (Creates folder chrome-temp-user-data)
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:3000" --profile-directory="Profile 2" --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=chrome-temp-user-data

-Run:
    npm start

-Attach debugger with config:
        {
            "type": "chrome",
            "request": "attach",
            "name": "Attach to Chrome",
            "port": 9222,
            "webRoot": "${workspaceRoot}"
        },