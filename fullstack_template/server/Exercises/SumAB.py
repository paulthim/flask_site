from Exercises.ExerciseBase import ExerciseBase
from Utilities import NumberUtils


class SumAB(ExerciseBase):
    @staticmethod
    def generate_values():
        values = NumberUtils.randomIntList(count=2)
        return " ".join([str(number) for number in values])

    @staticmethod
    def run(input_list):
        a, b = input_list.split(" ")
        return int(a) + int(b)
