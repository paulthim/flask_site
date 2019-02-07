from Exercises.ExerciseBase import ExerciseBase
from Utilities import NumberUtils


class SumsInLoop(ExerciseBase):
    @staticmethod
    def generate_values():
        values = []
        count = NumberUtils.randomInt(min_value=5, max_value=25)
        values.append(str(count))
        for i in range(count):
            values_pair = NumberUtils.randomIntList(2, max_value=1000)
            values.append(" ".join([str(value) for value in values_pair]))
        return values

    @staticmethod
    def run(input_list):
        count = int(input_list.pop(0))
        sums = []
        for i in range(count):
            a, b = input_list[i].split()
            sums.append(a+b)
        return " ".join(sums)
