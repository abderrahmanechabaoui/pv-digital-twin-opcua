# Analyse RAMI 4.0 d'un système de supervision photovoltaïque

RAMI 4.0 est un cube en trois dimensions qui sert à décrire, intégrer et standardiser les composants d'un
système Industrie 4.0. Ses trois axes sont indépendants :

- **Hiérarchie** : niveaux d'automatisation (IEC 62264 / IEC 61512) ;
- **Couches** : numérisation, de l'actif physique jusqu'au métier ;
- **Cycle de vie et chaîne de valeur** : Type et Instance (IEC 62890).

**Système étudié** : panneau photovoltaïque, batterie au plomb, régulateur de charge PWM, microcontrôleur
(logique locale), ESP32 (passerelle Wi-Fi), capteurs de courant et de tension INA219, écran LCD, relais et MOSFET.

## Axe 1 : Hiérarchie

| Niveau | Dénomination | Application au système solaire |
|---|---|---|
| 0 | Product | Énergie électrique produite, données brutes de tension et de courant |
| 1 | Field Device | Panneau, batterie, capteurs INA219, relais, MOSFET, écran LCD |
| 2 | Control Device | Microcontrôleur (logique de seuils), régulateur de charge PWM |
| 3 | Station | Circuit complet de supervision énergétique |
| 4 | Work Center | Parc de lampadaires solaires ou ferme PV regroupant plusieurs stations |
| 5 | Enterprise | Serveur central de supervision, ERP, gestion de la maintenance multi-sites |
| 6 | Connected World | Cloud, plateforme IoT, interopérabilité avec le réseau électrique et la météo |

## Axe 2 : Couches

| Couche | Dénomination | Application |
|---|---|---|
| 1 | Asset | Panneau, batterie, câbles, MOSFET, relais, boîtiers, connecteurs |
| 2 | Integration | Convertisseurs ADC, GPIO de pilotage des relais, interface physique de l'écran |
| 3 | Communication | UART entre le microcontrôleur et l'ESP32, Wi-Fi (MQTT/HTTP), bus I2C |
| 4 | Information | Grandeurs structurées : V<sub>pv</sub> (V), I<sub>charge</sub> (A), état de charge (%), messages JSON horodatés |
| 5 | Functional | Protection de la batterie, calcul PWM, gestion de l'affichage, détection de seuils |
| 6 | Business | Optimisation énergétique, maintenance prédictive (dérive des capteurs), reporting de performance |

## Axe 3 : Cycle de vie (IEC 62890)

| Phase | Sous-phase | Exemple |
|---|---|---|
| **Type** | Développement | Schéma de câblage, choix des composants, code source du firmware |
| | Maintenance du Type | Mise à jour du firmware, correction de bugs, refactorisation versionnée sur Git |
| **Instance** | Production | Soudure, assemblage, flash des microcontrôleurs, test unitaire |
| | Exploitation | Production d'énergie, envoi des mesures par l'ESP32 chaque seconde |
| | Maintenance | Nettoyage du panneau, remplacement de la batterie ou d'un relais |
| | Fin de vie | Décommissionnement, recyclage de la batterie au plomb, récupération des composants |

## Du modèle RAMI au jumeau numérique

Relier l'**Instance** au **Type** en temps réel :
1. l'ESP32 publie les mesures réelles (tension PV, courant batterie, température) vers un broker MQTT ;
2. un service (Node-RED, Python) les compare au modèle théorique du Type (rendement attendu, courbe de décharge) ;
3. un écart anormal déclenche une alerte de maintenance prédictive.

## Exemple : positionnement de l'ESP32 dans le cube

- **Hiérarchie** : passerelle entre le terrain et le monde connecté (lien vers le cloud) ;
- **Couches** : principalement *Communication* (MQTT/HTTP), et *Integration* par ses GPIO ;
- **Cycle de vie** : le module soudé est une *Instance* en exploitation, son firmware versionné est un *Type*.
