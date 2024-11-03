# heatmap_generator.py

import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def load_data():
    # Load data from heatmap.json
    data_points = []
    with open('heatmap.json', 'r') as file:
        for line in file:
            data = json.loads(line.strip())
            data_points.append((data['x'], data['y']))
    return data_points

def generate_heatmap():
    data_points = load_data()
    if not data_points:
        print("No data found.")
        return
    
    # Extract x and y coordinates
    x, y = zip(*data_points)
    
    # Create a 2D histogram for heatmap
    heatmap, xedges, yedges = np.histogram2d(x, y, bins=(100, 100), range=[[0, 1920], [0, 1080]])
    
    # Plot heatmap
    plt.figure(figsize=(10, 8))
    sns.heatmap(heatmap.T, cmap='viridis', square=True)
    plt.title("Mouse Movement Heatmap")
    plt.xlabel("X Position")
    plt.ylabel("Y Position")
    
    # Save as PNG
    plt.savefig("../public/assets/heatmap.png")
    print("Heatmap image saved as heatmap.png")

if __name__ == '__main__':
    generate_heatmap()
