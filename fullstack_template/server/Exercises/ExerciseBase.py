from abc import ABC, abstractmethod


class ExerciseBase(ABC):
    @staticmethod
    @abstractmethod
    def generate_values():
        pass

    @staticmethod
    @abstractmethod
    def run(input_list):
        pass
