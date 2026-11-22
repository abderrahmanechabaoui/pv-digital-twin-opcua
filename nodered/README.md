# IHM Node-RED

## Modules
- `node-red-contrib-opcua`
- `node-red-dashboard`

## Chaîne d'acquisition (lecture)
```
inject (1 Hz) ─► OpcUa-Item (Puissance_Sortie, Tension_DC) ─► OpcUa-Client [READ] ─► switch (msg.topic)
                                                                                    ├─► jauge + courbe Puissance
                                                                                    └─► jauge Tension DC
```

## Chaîne de commande (écriture)
```
ui_slider Irradiance  ─► format_opc_irradiance.js  ─┐
                                                    ├─► OpcUa-Client [WRITE] ─► KEPServerEX ─► Simulink
ui_slider Température ─► format_opc_temperature.js ─┘
```
Les fonctions de formatage valident aussi la plage des consignes avant l'écriture : une valeur hors plage
n'est jamais envoyée au procédé.

Endpoint : `opc.tcp://127.0.0.1:49320`

## Export du flow
**Menu → Export → All flows → Download**, puis enregistrer le fichier ici sous le nom `flows.json`.
