import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Load the dataset
df = pd.read_csv('housePrices.csv', encoding='latin1')

# Keep only relevant columns
columns_to_keep = ['City', 'Number_Beds', 'Number_Baths', 'Price']
df = df[columns_to_keep]

print('First few rows of the selected columns:')
print(df.head())

# Features and target
target_column = 'Price'
X = df.drop(target_column, axis=1)
y = df[target_column]

# One-hot encode categorical variables (City)
X = pd.get_dummies(X)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}') 