from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import List, Optional, Union
from pydantic import BaseModel
import uvicorn
import joblib
import os
import pandas as pd

app = FastAPI(title="Model API", description="API for predicting sector activity")

# Chemin du modèle
MODEL_PATH = "random_forest_pipeline(4).joblib"

# Colonnes du dataset
categorical_columns = [
    "Sexe", "Serie_Bac", "Etablissement", "Lieu_Habitation_Bac",
    "Matieres_Preferees", "Secteur_Desire", "Competences_Techniques",
    "Personnalite", "Religion", "Secteur_Activite_Famille",
    "Justification_Choix", "Descriptions"
]

numerical_columns = [
    "Age_Bac", "Note_Maths", "Note_Francais_Ecrit", "Note_Francais_Oral",
    "Note_Anglais_Ecrit", "Note_Anglais_Oral", "Note_Philo",
    "Note_Physique_Chimie", "Note_SVT", "Note_Histoire_Geo", "Note_EPS",
    "Note_Espagnol_Ecrit", "Note_Espagnol_Oral", "Note_Facultative_1",
    "Note_Facultative_2", "Points_BAC"
]

all_columns = categorical_columns + numerical_columns

# Schéma d'entrée
class PredictionInput(BaseModel):
    features: List[Union[str, float]]

# Schéma de réponse
class PredictionResponse(BaseModel):
    prediction: str
    probability: Optional[List[float]] = None

@app.get("/")
async def root():
    return {"message": "Welcome to the Model API"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(input_data: PredictionInput):
    try:
        # Vérifier le modèle
        if not os.path.exists(MODEL_PATH):
            raise HTTPException(status_code=404, detail="Model not found. Train it first.")

        # Charger le modèle
        model = joblib.load(MODEL_PATH)

        # Vérifier la longueur des données
        if len(input_data.features) != len(all_columns):
            raise HTTPException(status_code=400, detail=f"Expected {len(all_columns)} features, got {len(input_data.features)}")

        # Créer un DataFrame avec les colonnes appropriées
        features_df = pd.DataFrame([input_data.features], columns=all_columns)

        # Faire la prédiction
        prediction = model.predict(features_df)[0]

        # Obtenir les probabilités si disponible
        try:
            probability = model.predict_proba(features_df)[0].tolist()
        except AttributeError:
            probability = None

        return PredictionResponse(prediction=prediction, probability=probability)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
