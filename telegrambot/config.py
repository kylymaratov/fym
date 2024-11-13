import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--mode", choices=["dev", "prod"], default="dev")
args = parser.parse_args()
 
if args.mode == "prod":
    SERVER_HOST = "https://songfiy.online"
    SECRET_KEY = ""
else:
    SERVER_HOST = "http://localhost:5000"
    SECRET_KEY = "1ugOG5j6Hssq6d740Bne5eMnyNtXvq1r"

 


 