# ZnajdzUkryteLiczby
Moja pierwsza gra logiczna przy wykorzystaniu języka Javascript

ZASADY:

1. Wśród 100 liczb ukrytych jest 10 zielonych pól
2. W grze można znaleźć 4 rodzaje pól:
  - zielone - pola, które należy odkryć, aby wygrać
  - żółte - wskazują, że jedno pole obok w pionie lub poziomie znajduje się zielone pole
  - pomarańczowe - wskazują, że dwa pola dalej w pionie lub poziomie znajduje się zielone pole
  - czerwone - oznacza, że w odległości 2 pól w pionie lub w poziomie nie ma zielonego pola (ale może być pole obok na skos)
3. Grę rozpoczyna się mając 40 monet, a każde odkrycie innego niż zielonego pola kosztuje 1 monete

Układ w jakim występują zielone pola oraz oblegające je pozostałe pola:
 
           3
       3 3 2 3 3
       3 3 1 3 3
     3 2 1 0 1 2 3
       3 3 1 3 3
       3 3 2 3 3
           3
           
0 - zielone pole,
1 - żółte pola,
2 - pomarańczowe pola,
3 - czerwone pola
