IS_PROD = False


SERVER_HOST = "http://localhost:5000"
SECRET_KEY = "1ugOG5j6Hssq6d740Bne5eMnyNtXvq1r"

if IS_PROD:
    SERVER_HOST = "https://songfiy.online"
    SERVER_KEY = ""