# Modèle Simulink

Placer ici le modèle (`pv_digital_twin.slx`) et préciser la version de MATLAB utilisée.

## Paramètres de simulation
| Paramètre | Valeur | Raison |
|---|---|---|
| Solveur | Discrete, pas fixe | Compatible avec l'exécution temps réel |
| Pas de calcul | 0,001 s (1 kHz) | Compromis entre précision et charge CPU |
| Porteuse PWM de l'IGBT | < 500 Hz | Doit rester sous la fréquence de Nyquist du pas de calcul (théorème de Shannon) |
| Rapport cyclique DC-DC | Constante (0,5) | Étude en boucle ouverte ; une MPPT est prévue |
| Filtres | Blocs `Mean` sur la période fondamentale | Publication de valeurs moyennes stables en OPC UA |
| Communication | Industrial Communication Toolbox : `OPC UA Read` et `OPC UA Write` | Client OPC UA de KEPServerEX |

## Blocs OPC UA
- **OPC UA Read** : nœuds `Irradiance` et `Temperature` (namespace 2), ports *quality* et *timestamp* activés,
  suivi d'un `Bus Selector` vers les ports `Ir` et `T` du bloc `PV Array`.
- **OPC UA Write** : nœuds `Puissance_Sortie` et `Tension_DC`, sample time hérité (-1).
