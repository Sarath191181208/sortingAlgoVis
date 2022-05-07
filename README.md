The project is currently hosted on github pages here:
https://sarath191181208.github.io/sortingAlgoVis/

# Sorting Algoritm Visualizer

A **Sorting Algorithm** is used to rearrange a given array or list elements according to a comparison operator on the elements.

[Read more at Geeks For Geeks](https://www.geeksforgeeks.org/sorting-algorithms/)

## Demo

![Image](https://github.com/Sarath191181208/sortingAlgoVis/blob/main/images/Screenshot.png)

## Description

I am using **functional components & react hooks** to handle the events from the user.
List of Hooks used:

- useState.
- useEffect.
- useCallback.
- useRef.

Learn About Hooks here:

- [React Docs](https://reactjs.org/docs/hooks-reference.html)
- [Ask your Friend Google😜](https://www.google.com/)

The Animation is done using [setTimeout](https://www.w3schools.com/jsref/met_win_settimeout.asp) in a recursive fashion for the animation. In every step of recursion we get the next step of the algorithm.
The algorithm is precomputed for extensibility and is stored in a [Linked list](https://www.geeksforgeeks.org/implementation-linkedlist-javascript/).
For every recursive call the Linked List is iterated thus showing the animation.

## References

- [Sorting Algorithms Geeks For Geeks](https://www.geeksforgeeks.org/sorting-algorithms/)

## Features

- A Random button to creates a random board.
- A Clear button to totally clear the board.
- A Start button to start the visualization.
- Sliders to adjust animationn time and number of elements in the array.

## Technologies

- [React](https://reactjs.org/)
- [Babel](https://babeljs.io/)
- [Fontawesome (icons)](https://fontawesome.com/)
