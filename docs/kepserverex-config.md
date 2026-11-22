# Configuration de KEPServerEX

## 1. Canal et équipement
| Élément | Nom | Paramètres |
|---|---|---|
| Channel | `simulation_PV` | Driver **Simulator** (mémoire virtuelle qui remplace un automate physique) |
| Device | `jumeau_matlab` | Model 16 Bit Device, ID 1, Data Collection activée |

## 2. Tags
| Tag | Adresse | Data Type | Scan rate | Lu par | Écrit par |
|---|---|---|---|---|---|
| `Irradiance` | R0001 | Float | 100 ms | Simulink | Node-RED |
| `Temperature` | R0002 | Float | 100 ms | Simulink | Node-RED |
| `Puissance_Sortie` | R0003 | Float | 100 ms | Node-RED | Simulink |
| `Tension_DC` | R0004 | Float | 100 ms | Node-RED | Simulink |

**Pourquoi forcer Float** : OPC UA impose un typage strict. Une écriture de type String est rejetée
(*Type Mismatch*), ce qui empêche qu'une consigne mal formée atteigne le modèle.

> **Points d'attention (driver Simulator)**
> - Un Float occupe **deux registres de 16 bits**. Dans un modèle 16 bits, espacer les adresses de 2
>   (R0000, R0002, R0004…) pour éviter que deux tags se chevauchent et donnent des valeurs aberrantes.
> - Les registres `R` peuvent être générés en interne par le driver. Si les écritures externes restent sans
>   effet, utiliser des registres `K` (constants).

## 3. Endpoint OPC UA (OPC UA Configuration Manager)
| Paramètre | Prototype local | Recommandé en production |
|---|---|---|
| URL | `opc.tcp://127.0.0.1:49320` | Interface de la zone de supervision uniquement |
| Security policy | None | Basic256Sha256, Sign & Encrypt |
| Authentification | Anonyme | Comptes utilisateurs avec droits minimaux |
| Certificats clients | Non vérifiés | Approuvés explicitement dans *Trusted Clients* |

Vérification : dans le *Quick Client*, la qualité de chaque tag doit être **Good**.
