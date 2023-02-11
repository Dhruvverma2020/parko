import random

def generate_otp(phone):
    otp = ""
    for _ in range(4):
        otp += str(random.randint(0,9))

    # TODO
    print(f"OTP {otp} generated for phone number {phone}")

    return otp


if __name__ == '__main__':
    print(generate_otp())