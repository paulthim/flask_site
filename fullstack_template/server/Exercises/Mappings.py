from . import *

ClassMapping = {
    1: {'name': 'SumAB',
        'title': 'Sum A+B',
        'dispatch': SumAB.SumAB,
        'snippet': 'a, b = input().split() \nprint(int(a) + int(b))',
        'description': 'The most starter of starters: given two integer inputs, return their sum.'
        },
    2: {"name": "SumInLoop",
        "title": "Sum Of A Loop",
        "dispatch": SumInLoop.SumInLoop,
        "snippet": "n = input() \nlist_of_numbers = input() "
                   "\nnumbers = [int(s) for s in list_of_numbers.split()]\nprint(sum(numbers))",
        "description": "A teensy bit more complicated. Given a list of "
                       "numbers of length n, return the sum of the list."
        },
    3: {"name": "SumsInLoop",
        "title": "Sums In A Loop",
        "dispatch": SumsInLoop.SumsInLoop,
        "snippet": "count = input() \nfor i in range(count): "
                   "\n\ta, b = [int(value) for value in input_list[i].split()] "
                   "\n\tprint(a+b)",
        "description": "Expanding on the previous exercise. Here we iterate over a set of pairs, "
                       "printing each sum."}
}


def class_dispatch(key):
    if key in ClassMapping:
        return ClassMapping[key]["dispatch"]
    else:
        return None
