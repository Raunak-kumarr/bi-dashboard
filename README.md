## 📊 Filterable BI Dashboard

This project is a dummy **Business Intelligence dashboard** that mimics Amazon-like filtering functionality.  
It loads numerical data from a CSV file and allows users to filter and explore it based on **modulo-based columns** with interactive filters.

---

### 🔗 Live Demo

🌐 [Click here to open the dashboard](https://unrivaled-piroshki-916412.netlify.app/)

---

### 🚀 Features

- ✅ CSV data loading via [PapaParse](https://www.npmjs.com/package/papaparse)
- ✅ Dynamic filters for each column using multi-select dropdowns
- ✅ Smart filter interaction: selecting one filter updates others automatically
- ✅ DataTable with pagination, scroll, sorting
- ✅ Optimized using `useMemo` for performance
- ✅ React 18 compatible

---

### 📂 Dataset

- `public/dataset_small.csv`: for initial testing
- `public/dataset_large.csv`: used for performance testing (up to 1000 rows)

---

### 🧪 Technologies Used

- **React**
- **PapaParse** for CSV parsing
- **Multiselect React Dropdown** for filters
- **React Data Table Component** for tabular data

---

### ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Raunak-kumarr/bi-dashboard.git
cd bi-dashboard

# Install dependencies
npm install

# Start local server
npm start
```

---

### 📦 Build for Production

```bash
npm run build
```

---

### 📝 Folder Structure

```
src/
│
├── App.js                   // Entry point
├── FilterableDashboard.jsx // Main dashboard component
├── index.js
```

---

### 🙌 Acknowledgements

- PapaParse CSV library
- Multiselect React Dropdown component
- React Data Table component
- Inspired by Amazon's filtering UI
