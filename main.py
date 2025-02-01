from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import List, Optional, Union
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import numpy as np
from typing import List, Optional
import joblib
import os
import pandas as pd 

app = FastAPI(title="Model API", description="API for machine learning model predictions")

# Path where the model will be saved
MODEL_PATH = "random_forest_pipeline.joblib"

class PredictionInput(BaseModel):
    features: List[Union[str, float]]  
    
class PredictionResponse(BaseModel):
    prediction: float
    probability: Optional[List[float]] = None
    

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# Définissez les colonnes catégorielles et numériques
categorical_columns = [
    'Sexe', 'Serie_Bac', 'Etablissement', 'Lieu_Habitation_Bac',
    'Matieres_Preferees', 'Secteur_Desire', 'Competences_Techniques',
    'Personnalite', 'Religion', 'Secteur_Activite_Famille',
    'Justification_Choix', 'Descriptions'
]
numerical_columns = [
    'Age_Bac', 'Note_Maths', 'Note_Francais_Ecrit', 'Note_Francais_Oral',
    'Note_Anglais_Ecrit', 'Note_Anglais_Oral', 'Note_Philo',
    'Note_Physique_Chimie', 'Note_SVT', 'Note_Histoire_Geo', 'Note_EPS',
    'Note_Espagnol_Ecrit', 'Note_Espagnol_Oral', 'Note_Facultative_1',
    'Note_Facultative_2', 'Points_BAC'
]

# Configurez le ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_columns),
        ('num', StandardScaler(), numerical_columns)
    ]
)    

@app.get("/")
async def root():
    return {"message": "Welcome to the Model API"}

# @app.post("/predict", response_model=PredictionResponse)
# async def predict(input_data: PredictionInput):
#     try:
#         # Load the model
#         if not os.path.exists(MODEL_PATH):
#             raise HTTPException(status_code=404, detail="Model not found. Please train the model first.")
        
#         model = joblib.load(MODEL_PATH)
#         print(model)
#         # Convert input features to numpy array
#         features = np.array(input_data.features).reshape(1, -1)
        
#         # Make prediction
#         prediction = model.predict(features)[0]
        
#         # Get probability scores if the model supports it
#         try:
#             probability = model.predict_proba(features)[0].tolist()
#         except:
#             probability = None
        
#         return PredictionResponse(prediction=float(prediction), probability=probability)
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict", response_model=PredictionResponse)
async def predict(input_data: PredictionInput):
    try:
        # Vérifiez que les données d'entrée ont la bonne forme
        if len(input_data.features) != 28:
            raise HTTPException(status_code=400, detail="Input data must contain exactly 28 features.")
        
        # Chargez le modèle
        if not os.path.exists(MODEL_PATH):
            raise HTTPException(status_code=404, detail="Model not found. Please train the model first.")
        
        model = joblib.load(MODEL_PATH)
        print(model)
        
        # Créez un DataFrame Pandas avec les noms de colonnes appropriés
        columns = categorical_columns + numerical_columns
        features_df = pd.DataFrame([input_data.features], columns=columns)
        
        # Faites la prédiction
        prediction = model.predict(features_df)[0]
        
        # Obtenez les probabilités si le modèle les supporte
        try:
            probability = model.predict_proba(features_df)[0].tolist()
        except:
            probability = None
        
        return PredictionResponse(prediction=float(prediction), probability=probability)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/train")
async def train_model(file: UploadFile = File(...)):
    """
    Train the model with new data
    File should be a CSV with features and target columns
    """
    try:
        # Here you would implement the training logic
        # This is a placeholder that should be implemented based on your specific needs
        return {"message": "Training endpoint. Implementation needed based on your specific model."}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)