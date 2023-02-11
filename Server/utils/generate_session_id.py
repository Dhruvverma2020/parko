import string    
import random

S = 16

def sess_id() -> str:
    ran = ''.join(random.choices(string.ascii_lowercase + string.digits, k = S))    
    return str(ran)