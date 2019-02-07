from Exercises.ExerciseBase import ExerciseBase
from Utilities import NumberUtils


class SumInLoop(ExerciseBase):
    @staticmethod
    def generate_values():
        values = []
        count = NumberUtils.randomInt(min_value=5, max_value=25)

        for i in range(count):
            values.append(str(NumberUtils.randomInt()))
        return [(str(count)), " ".join(values)]

    @staticmethod
    def run(input_list):
        # Python makes this easier, in that you don't need to know the
        # size of a list for either the comprehension or the built-in sum()
        list_of_numbers = input_list[1]
        numbers = [int(s) for s in list_of_numbers.split()]
        return sum(numbers)
