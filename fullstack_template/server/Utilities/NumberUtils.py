import random


def randomInt(min_value=5, max_value=100):
    return random.randint(min_value, max_value)


def randomIntList(count=1, max_value=100):
    result = []
    for i in range(count):
        result.append(randomInt(1, max_value))
    return result
