const { useState, useEffect, useContext, createContext } = React;

// Sample data
const initialData = {
  "customers": [
    {"id": 1, "name": "ABC Electronics", "contact": "John Doe", "email": "john@abc.com", "phone": "+1-555-0123", "address": "123 Tech Street, Silicon Valley, CA", "totalOrders": 45, "totalValue": 125000, "status": "Active"},
    {"id": 2, "name": "XYZ Foods", "contact": "Sarah Smith", "email": "sarah@xyzfoods.com", "phone": "+1-555-0456", "address": "456 Food Ave, Chicago, IL", "totalOrders": 32, "totalValue": 89000, "status": "Active"},
    {"id": 3, "name": "Global Retail Corp", "contact": "Mike Johnson", "email": "mike@globalretail.com", "phone": "+1-555-0789", "address": "789 Retail Blvd, New York, NY", "totalOrders": 67, "totalValue": 234000, "status": "Active"}
  ],
  "products": [
    {"id": 1, "name": "RSC Box 12x8x6", "type": "RSC", "fefcoCode": "0201", "dimensions": "12x8x6", "fluteType": "C", "wallType": "Single Wall", "unitPrice": 0.85, "productionCost": 0.62},
    {"id": 2, "name": "HSC Box 15x12x10", "type": "HSC", "fefcoCode": "0202", "dimensions": "15x12x10", "fluteType": "BC", "wallType": "Double Wall", "unitPrice": 1.45, "productionCost": 1.12},
    {"id": 3, "name": "FOL Box 10x10x10", "type": "FOL", "fefcoCode": "0300", "dimensions": "10x10x10", "fluteType": "E", "wallType": "Single Wall", "unitPrice": 0.95, "productionCost": 0.71}
  ],
  "inventory": [
    {"id": 1, "itemName": "Kraft Paper Roll 175GSM", "category": "Raw Material", "currentStock": 2500, "minStock": 500, "maxStock": 5000, "unit": "Tons", "location": "Warehouse A", "lastUpdate": "2024-10-07", "supplier": "PaperCorp Industries"},
    {"id": 2, "itemName": "Corn Starch Adhesive", "category": "Raw Material", "currentStock": 150, "minStock": 50, "maxStock": 300, "unit": "Drums", "location": "Chemical Storage", "lastUpdate": "2024-10-06", "supplier": "ChemSupply Ltd"},
    {"id": 3, "itemName": "RSC Box 12x8x6", "category": "Finished Goods", "currentStock": 15000, "minStock": 5000, "maxStock": 25000, "unit": "Pieces", "location": "FG Warehouse", "lastUpdate": "2024-10-07", "productId": 1}
  ],
  "salesOrders": [
    {"id": 1001, "customerId": 1, "customerName": "ABC Electronics", "orderDate": "2024-10-05", "deliveryDate": "2024-10-15", "status": "In Production", "totalAmount": 12750, "items": [{"productId": 1, "productName": "RSC Box 12x8x6", "quantity": 15000, "unitPrice": 0.85}]},
    {"id": 1002, "customerId": 2, "customerName": "XYZ Foods", "orderDate": "2024-10-06", "deliveryDate": "2024-10-18", "status": "Confirmed", "totalAmount": 14500, "items": [{"productId": 2, "productName": "HSC Box 15x12x10", "quantity": 10000, "unitPrice": 1.45}]},
    {"id": 1003, "customerId": 3, "customerName": "Global Retail Corp", "orderDate": "2024-10-07", "deliveryDate": "2024-10-20", "status": "Quotation", "totalAmount": 9500, "items": [{"productId": 3, "productName": "FOL Box 10x10x10", "quantity": 10000, "unitPrice": 0.95}]}
  ],
  "productionOrders": [
    {"id": 2001, "salesOrderId": 1001, "productId": 1, "productName": "RSC Box 12x8x6", "quantity": 15000, "startDate": "2024-10-08", "endDate": "2024-10-12", "status": "In Progress", "machine": "Corrugator Line 1", "progress": 65},
    {"id": 2002, "salesOrderId": 1002, "productId": 2, "productName": "HSC Box 15x12x10", "quantity": 10000, "startDate": "2024-10-10", "endDate": "2024-10-16", "status": "Scheduled", "machine": "Corrugator Line 2", "progress": 0}
  ],
  "suppliers": [
    {"id": 1, "name": "PaperCorp Industries", "contact": "David Wilson", "email": "david@papercorp.com", "phone": "+1-555-1111", "materials": ["Kraft Paper", "Test Liner"], "rating": 4.5, "onTimeDelivery": 92},
    {"id": 2, "name": "ChemSupply Ltd", "contact": "Lisa Brown", "email": "lisa@chemsupply.com", "phone": "+1-555-2222", "materials": ["Adhesives", "Inks"], "rating": 4.2, "onTimeDelivery": 88},
    {"id": 3, "name": "MachineWorks Co", "contact": "Robert Taylor", "email": "robert@machineworks.com", "phone": "+1-555-3333", "materials": ["Spare Parts", "Maintenance"], "rating": 4.7, "onTimeDelivery": 95}
  ],
  "purchaseOrders": [
    {"id": 3001, "supplierId": 1, "supplierName": "PaperCorp Industries", "orderDate": "2024-10-03", "deliveryDate": "2024-10-13", "status": "Confirmed", "totalAmount": 87500, "items": [{"material": "Kraft Paper Roll 175GSM", "quantity": 50, "unit": "Tons", "unitPrice": 1750}]},
    {"id": 3002, "supplierId": 2, "supplierName": "ChemSupply Ltd", "orderDate": "2024-10-05", "deliveryDate": "2024-10-12", "status": "Pending", "totalAmount": 15000, "items": [{"material": "Corn Starch Adhesive", "quantity": 50, "unit": "Drums", "unitPrice": 300}]}
  ],
  "qualityChecks": [
    {"id": 4001, "productionOrderId": 2001, "productName": "RSC Box 12x8x6", "checkDate": "2024-10-07", "inspector": "Quality Team A", "edgeCrushStrength": 7.2, "burstStrength": 200, "moistureContent": 8.5, "status": "Passed", "remarks": "All parameters within specification"},
    {"id": 4002, "productionOrderId": 2001, "productName": "RSC Box 12x8x6", "checkDate": "2024-10-06", "inspector": "Quality Team B", "edgeCrushStrength": 6.8, "burstStrength": 195, "moistureContent": 9.2, "status": "Failed", "remarks": "Edge crush strength below minimum requirement"}
  ],
  "machines": [
    {"id": 1, "name": "Corrugator Line 1", "type": "Single Face + Double Backer", "capacity": 2000, "currentLoad": 65, "status": "Running", "efficiency": 92, "lastMaintenance": "2024-09-15"},
    {"id": 2, "name": "Corrugator Line 2", "type": "Single Face + Double Backer", "capacity": 1800, "currentLoad": 0, "status": "Idle", "efficiency": 88, "lastMaintenance": "2024-09-20"},
    {"id": 3, "name": "Converting Line 1", "type": "Rotary Die Cutter", "capacity": 5000, "currentLoad": 45, "status": "Running", "efficiency": 89, "lastMaintenance": "2024-09-10"}
  ],
  "dashboardMetrics": {
    "totalOrders": 156,
    "activeProductionOrders": 12,
    "lowStockAlerts": 3,
    "revenueThisMonth": 450000,
    "salesTrend": [
      {"month": "May", "revenue": 380000},
      {"month": "Jun", "revenue": 420000},
      {"month": "Jul", "revenue": 395000},
      {"month": "Aug", "revenue": 445000},
      {"month": "Sep", "revenue": 430000},
      {"month": "Oct", "revenue": 450000}
    ],
    "inventoryTurnover": [
      {"category": "Raw Materials", "turnover": 8.5},
      {"category": "WIP", "turnover": 12.2},
      {"category": "Finished Goods", "turnover": 6.8}
    ],
    "productionEfficiency": [
      {"machine": "Line 1", "efficiency": 92},
      {"machine": "Line 2", "efficiency": 88},
      {"machine": "Line 3", "efficiency": 89}
    ]
  }
};

// Context for global state management
const AppContext = createContext();

// Context Provider Component
const AppProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  const updateData = (category, newData) => {
    setData(prev => ({
      ...prev,
      [category]: newData
    }));
  };

  const addRecord = (category, record) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], record]
    }));
  };

  const updateRecord = (category, id, updatedRecord) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, ...updatedRecord } : item
      )
    }));
  };

  const deleteRecord = (category, id) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      data,
      activeModule,
      setActiveModule,
      loading,
      setLoading,
      updateData,
      addRecord,
      updateRecord,
      deleteRecord
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const getStockStatus = (current, min, max) => {
  if (current <= min) return 'low';
  if (current >= max * 0.8) return 'high';
  return 'medium';
};

const exportToCSV = (data, filename) => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(field => `"${row[field] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Sidebar Component
const Sidebar = () => {
  const { activeModule, setActiveModule } = useAppContext();

  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { id: 'inventory', icon: 'fas fa-boxes', label: 'Inventory Management' },
    { id: 'sales', icon: 'fas fa-shopping-cart', label: 'Sales Management' },
    { id: 'production', icon: 'fas fa-cogs', label: 'Production Planning' },
    { id: 'purchase', icon: 'fas fa-shopping-bag', label: 'Purchase Management' },
    { id: 'quality', icon: 'fas fa-check-circle', label: 'Quality Control' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reporting' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">CorruBox ERP</div>
        <div className="sidebar-subtitle">Manufacturing Management</div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
            onClick={() => setActiveModule(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

// Header Component
const Header = () => {
  const { activeModule } = useAppContext();
  
  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'inventory': 'Inventory Management',
      'sales': 'Sales Management',
      'production': 'Production Planning',
      'purchase': 'Purchase Management',
      'quality': 'Quality Control',
      'reports': 'Reporting'
    };
    return titles[activeModule] || 'Dashboard';
  };

  return (
    <header className="header">
      <div>
        <h1>{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-16">
        <span className="text-sm text-secondary">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
    </header>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, onSave, saveButtonText = "Save" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn--outline" onClick={onClose}>Cancel</button>
          {onSave && <button className="btn btn--primary" onClick={onSave}>{saveButtonText}</button>}
        </div>
      </div>
    </div>
  );
};

// Chart Components
const LineChart = ({ data, containerId }) => {
  useEffect(() => {
    const ctx = document.getElementById(containerId);
    if (!ctx || !data) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.month),
        datasets: [{
          label: 'Revenue',
          data: data.map(item => item.revenue),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        }
      }
    });
  }, [data, containerId]);

  return <canvas id={containerId}></canvas>;
};

const BarChart = ({ data, containerId, label }) => {
  useEffect(() => {
    const ctx = document.getElementById(containerId);
    if (!ctx || !data) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.category || item.machine),
        datasets: [{
          label: label,
          data: data.map(item => item.turnover || item.efficiency),
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [data, containerId, label]);

  return <canvas id={containerId}></canvas>;
};

// Dashboard Components
const MetricCard = ({ title, value, change, icon }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <div className="metric-value">{value}</div>
    {change && <div className="metric-change">+{change}% from last month</div>}
  </div>
);

const Dashboard = () => {
  const { data } = useAppContext();
  const metrics = data.dashboardMetrics;

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <MetricCard 
          title="Total Orders" 
          value={formatNumber(metrics.totalOrders)}
          change="12"
        />
        <MetricCard 
          title="Active Production Orders" 
          value={formatNumber(metrics.activeProductionOrders)}
          change="5"
        />
        <MetricCard 
          title="Low Stock Alerts" 
          value={formatNumber(metrics.lowStockAlerts)}
        />
        <MetricCard 
          title="Revenue This Month" 
          value={formatCurrency(metrics.revenueThisMonth)}
          change="8"
        />
      </div>

      <div className="quick-actions">
        <div className="quick-action-card">
          <div className="quick-action-icon">
            <i className="fas fa-plus"></i>
          </div>
          <div className="quick-action-title">New Sales Order</div>
        </div>
        <div className="quick-action-card">
          <div className="quick-action-icon">
            <i className="fas fa-cog"></i>
          </div>
          <div className="quick-action-title">Schedule Production</div>
        </div>
        <div className="quick-action-card">
          <div className="quick-action-icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="quick-action-title">Create Purchase Order</div>
        </div>
        <div className="quick-action-card">
          <div className="quick-action-icon">
            <i className="fas fa-check"></i>
          </div>
          <div className="quick-action-title">Quality Inspection</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3 className="chart-title">Sales Trend</h3>
          <LineChart data={metrics.salesTrend} containerId="salesChart" />
        </div>
        <div className="chart-container">
          <h3 className="chart-title">Inventory Turnover</h3>
          <BarChart data={metrics.inventoryTurnover} containerId="inventoryChart" label="Turnover Rate" />
        </div>
        <div className="chart-container">
          <h3 className="chart-title">Production Efficiency</h3>
          <BarChart data={metrics.productionEfficiency} containerId="efficiencyChart" label="Efficiency %" />
        </div>
      </div>
    </div>
  );
};

// Inventory Management Component
const InventoryManagement = () => {
  const { data, addRecord, updateRecord, deleteRecord } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Raw Material',
    currentStock: '',
    minStock: '',
    maxStock: '',
    unit: '',
    location: '',
    supplier: ''
  });

  const filteredInventory = data.inventory.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSave = () => {
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      ...formData,
      currentStock: parseInt(formData.currentStock),
      minStock: parseInt(formData.minStock),
      maxStock: parseInt(formData.maxStock),
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    if (editingItem) {
      updateRecord('inventory', editingItem.id, newItem);
    } else {
      addRecord('inventory', newItem);
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      itemName: '',
      category: 'Raw Material',
      currentStock: '',
      minStock: '',
      maxStock: '',
      unit: '',
      location: '',
      supplier: ''
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    exportToCSV(filteredInventory, 'inventory_report');
  };

  const getStockLevel = (item) => {
    const status = getStockStatus(item.currentStock, item.minStock, item.maxStock);
    return (
      <div className="stock-level">
        <div className={`stock-indicator stock-indicator--${status}`}></div>
        <span>{formatNumber(item.currentStock)} {item.unit}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="data-table">
        <div className="table-header">
          <h2 className="table-title">Inventory Items</h2>
          <div className="table-actions">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="form-control"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Raw Material">Raw Material</option>
              <option value="Finished Goods">Finished Goods</option>
              <option value="WIP">Work in Progress</option>
            </select>
            <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-plus"></i> Add Item
            </button>
            <button className="btn btn--outline" onClick={handleExport}>
              <i className="fas fa-download"></i> Export
            </button>
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Min Stock</th>
              <th>Location</th>
              <th>Supplier</th>
              <th>Last Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item.id}>
                <td>{item.itemName}</td>
                <td>
                  <span className={`status-badge status-badge--${item.category.toLowerCase().replace(' ', '-')}`}>
                    {item.category}
                  </span>
                </td>
                <td>{getStockLevel(item)}</td>
                <td>{formatNumber(item.minStock)} {item.unit}</td>
                <td>{item.location}</td>
                <td>{item.supplier}</td>
                <td>{item.lastUpdate}</td>
                <td>
                  <button 
                    className="btn btn--sm btn--outline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
          setFormData({
            itemName: '',
            category: 'Raw Material',
            currentStock: '',
            minStock: '',
            maxStock: '',
            unit: '',
            location: '',
            supplier: ''
          });
        }}
        title={editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        onSave={handleSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.itemName}
              onChange={(e) => setFormData({...formData, itemName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Raw Material">Raw Material</option>
              <option value="Finished Goods">Finished Goods</option>
              <option value="WIP">Work in Progress</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Current Stock</label>
            <input
              type="number"
              className="form-control"
              value={formData.currentStock}
              onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Minimum Stock</label>
            <input
              type="number"
              className="form-control"
              value={formData.minStock}
              onChange={(e) => setFormData({...formData, minStock: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Maximum Stock</label>
            <input
              type="number"
              className="form-control"
              value={formData.maxStock}
              onChange={(e) => setFormData({...formData, maxStock: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Unit</label>
            <input
              type="text"
              className="form-control"
              value={formData.unit}
              onChange={(e) => setFormData({...formData, unit: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Supplier</label>
            <input
              type="text"
              className="form-control"
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Sales Management Component
const SalesManagement = () => {
  const { data, addRecord, updateRecord } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  
  const [orderFormData, setOrderFormData] = useState({
    customerId: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    status: 'Quotation',
    items: [{ productId: '', quantity: '', unitPrice: '' }]
  });

  const [customerFormData, setCustomerFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const filteredOrders = data.salesOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCustomers = data.customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderSave = () => {
    const totalAmount = orderFormData.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );

    const customer = data.customers.find(c => c.id === parseInt(orderFormData.customerId));
    const orderItems = orderFormData.items.map(item => {
      const product = data.products.find(p => p.id === parseInt(item.productId));
      return {
        ...item,
        productName: product?.name || '',
        quantity: parseInt(item.quantity),
        unitPrice: parseFloat(item.unitPrice)
      };
    });

    const newOrder = {
      id: editingOrder ? editingOrder.id : Date.now(),
      ...orderFormData,
      customerId: parseInt(orderFormData.customerId),
      customerName: customer?.name || '',
      totalAmount,
      items: orderItems
    };

    if (editingOrder) {
      updateRecord('salesOrders', editingOrder.id, newOrder);
    } else {
      addRecord('salesOrders', newOrder);
    }

    setIsOrderModalOpen(false);
    setEditingOrder(null);
    setOrderFormData({
      customerId: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      status: 'Quotation',
      items: [{ productId: '', quantity: '', unitPrice: '' }]
    });
  };

  const handleCustomerSave = () => {
    const newCustomer = {
      id: editingCustomer ? editingCustomer.id : Date.now(),
      ...customerFormData,
      totalOrders: 0,
      totalValue: 0
    };

    if (editingCustomer) {
      updateRecord('customers', editingCustomer.id, newCustomer);
    } else {
      addRecord('customers', newCustomer);
    }

    setIsCustomerModalOpen(false);
    setEditingCustomer(null);
    setCustomerFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active'
    });
  };

  const addOrderItem = () => {
    setOrderFormData({
      ...orderFormData,
      items: [...orderFormData.items, { productId: '', quantity: '', unitPrice: '' }]
    });
  };

  const removeOrderItem = (index) => {
    const newItems = orderFormData.items.filter((_, i) => i !== index);
    setOrderFormData({ ...orderFormData, items: newItems });
  };

  const updateOrderItem = (index, field, value) => {
    const newItems = [...orderFormData.items];
    newItems[index][field] = value;
    
    // Auto-populate unit price when product is selected
    if (field === 'productId') {
      const product = data.products.find(p => p.id === parseInt(value));
      if (product) {
        newItems[index].unitPrice = product.unitPrice;
      }
    }
    
    setOrderFormData({ ...orderFormData, items: newItems });
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button 
          className={`btn ${activeTab === 'orders' ? 'btn--primary' : 'btn--outline'}`}
          onClick={() => setActiveTab('orders')}
        >
          Sales Orders
        </button>
        <button 
          className={`btn ${activeTab === 'customers' ? 'btn--primary' : 'btn--outline'}`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="data-table">
          <div className="table-header">
            <h2 className="table-title">Sales Orders</h2>
            <div className="table-actions">
              <input
                type="text"
                placeholder="Search orders..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Quotation">Quotation</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Production">In Production</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button className="btn btn--primary" onClick={() => setIsOrderModalOpen(true)}>
                <i className="fas fa-plus"></i> New Order
              </button>
              <button className="btn btn--outline" onClick={() => exportToCSV(filteredOrders, 'sales_orders')}>
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.deliveryDate}</td>
                  <td>
                    <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <button 
                      className="btn btn--sm btn--outline"
                      onClick={() => {
                        setEditingOrder(order);
                        setOrderFormData(order);
                        setIsOrderModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="data-table">
          <div className="table-header">
            <h2 className="table-title">Customers</h2>
            <div className="table-actions">
              <input
                type="text"
                placeholder="Search customers..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn--primary" onClick={() => setIsCustomerModalOpen(true)}>
                <i className="fas fa-plus"></i> Add Customer
              </button>
              <button className="btn btn--outline" onClick={() => exportToCSV(filteredCustomers, 'customers')}>
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total Orders</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{formatNumber(customer.totalOrders)}</td>
                  <td>{formatCurrency(customer.totalValue)}</td>
                  <td>
                    <span className={`status-badge status-badge--${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn--sm btn--outline"
                      onClick={() => {
                        setEditingCustomer(customer);
                        setCustomerFormData(customer);
                        setIsCustomerModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setEditingOrder(null);
          setOrderFormData({
            customerId: '',
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: '',
            status: 'Quotation',
            items: [{ productId: '', quantity: '', unitPrice: '' }]
          });
        }}
        title={editingOrder ? 'Edit Sales Order' : 'Create New Sales Order'}
        onSave={handleOrderSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Customer</label>
            <select
              className="form-control"
              value={orderFormData.customerId}
              onChange={(e) => setOrderFormData({...orderFormData, customerId: e.target.value})}
            >
              <option value="">Select Customer</option>
              {data.customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Order Date</label>
            <input
              type="date"
              className="form-control"
              value={orderFormData.orderDate}
              onChange={(e) => setOrderFormData({...orderFormData, orderDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Date</label>
            <input
              type="date"
              className="form-control"
              value={orderFormData.deliveryDate}
              onChange={(e) => setOrderFormData({...orderFormData, deliveryDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={orderFormData.status}
              onChange={(e) => setOrderFormData({...orderFormData, status: e.target.value})}
            >
              <option value="Quotation">Quotation</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Production">In Production</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4>Order Items</h4>
            <button className="btn btn--sm btn--primary" onClick={addOrderItem}>
              <i className="fas fa-plus"></i> Add Item
            </button>
          </div>

          {orderFormData.items.map((item, index) => (
            <div key={index} className="form-grid mb-4 p-4 border rounded">
              <div className="form-group">
                <label className="form-label">Product</label>
                <select
                  className="form-control"
                  value={item.productId}
                  onChange={(e) => updateOrderItem(index, 'productId', e.target.value)}
                >
                  <option value="">Select Product</option>
                  {data.products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={item.unitPrice}
                  onChange={(e) => updateOrderItem(index, 'unitPrice', e.target.value)}
                />
              </div>
              <div className="form-group flex items-end">
                {orderFormData.items.length > 1 && (
                  <button 
                    className="btn btn--sm btn--outline"
                    onClick={() => removeOrderItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Customer Modal */}
      <Modal
        isOpen={isCustomerModalOpen}
        onClose={() => {
          setIsCustomerModalOpen(false);
          setEditingCustomer(null);
          setCustomerFormData({
            name: '',
            contact: '',
            email: '',
            phone: '',
            address: '',
            status: 'Active'
          });
        }}
        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
        onSave={handleCustomerSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              value={customerFormData.name}
              onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Person</label>
            <input
              type="text"
              className="form-control"
              value={customerFormData.contact}
              onChange={(e) => setCustomerFormData({...customerFormData, contact: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={customerFormData.email}
              onChange={(e) => setCustomerFormData({...customerFormData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={customerFormData.phone}
              onChange={(e) => setCustomerFormData({...customerFormData, phone: e.target.value})}
            />
          </div>
          <div className="form-group" style={{gridColumn: '1 / -1'}}>
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              rows="3"
              value={customerFormData.address}
              onChange={(e) => setCustomerFormData({...customerFormData, address: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={customerFormData.status}
              onChange={(e) => setCustomerFormData({...customerFormData, status: e.target.value})}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Production Planning Component
const ProductionPlanning = () => {
  const { data, addRecord, updateRecord } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  
  const [formData, setFormData] = useState({
    salesOrderId: '',
    productId: '',
    quantity: '',
    startDate: '',
    endDate: '',
    status: 'Scheduled',
    machine: ''
  });

  const filteredOrders = data.productionOrders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    const product = data.products.find(p => p.id === parseInt(formData.productId));
    const newOrder = {
      id: editingOrder ? editingOrder.id : Date.now(),
      ...formData,
      salesOrderId: parseInt(formData.salesOrderId),
      productId: parseInt(formData.productId),
      productName: product?.name || '',
      quantity: parseInt(formData.quantity),
      progress: editingOrder ? editingOrder.progress : 0
    };

    if (editingOrder) {
      updateRecord('productionOrders', editingOrder.id, newOrder);
    } else {
      addRecord('productionOrders', newOrder);
    }

    setIsModalOpen(false);
    setEditingOrder(null);
    setFormData({
      salesOrderId: '',
      productId: '',
      quantity: '',
      startDate: '',
      endDate: '',
      status: 'Scheduled',
      machine: ''
    });
  };

  return (
    <div>
      <div className="data-table">
        <div className="table-header">
          <h2 className="table-title">Production Orders</h2>
          <div className="table-actions">
            <input
              type="text"
              placeholder="Search production orders..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-plus"></i> New Production Order
            </button>
            <button className="btn btn--outline" onClick={() => exportToCSV(filteredOrders, 'production_orders')}>
              <i className="fas fa-download"></i> Export
            </button>
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Production ID</th>
              <th>Sales Order</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Machine</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>#{order.salesOrderId}</td>
                <td>{order.productName}</td>
                <td>{formatNumber(order.quantity)}</td>
                <td>{order.startDate}</td>
                <td>{order.endDate}</td>
                <td>{order.machine}</td>
                <td>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{order.progress}%</span>
                </td>
                <td>
                  <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn--sm btn--outline"
                    onClick={() => {
                      setEditingOrder(order);
                      setFormData(order);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOrder(null);
          setFormData({
            salesOrderId: '',
            productId: '',
            quantity: '',
            startDate: '',
            endDate: '',
            status: 'Scheduled',
            machine: ''
          });
        }}
        title={editingOrder ? 'Edit Production Order' : 'Create New Production Order'}
        onSave={handleSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Sales Order</label>
            <select
              className="form-control"
              value={formData.salesOrderId}
              onChange={(e) => setFormData({...formData, salesOrderId: e.target.value})}
            >
              <option value="">Select Sales Order</option>
              {data.salesOrders.map(order => (
                <option key={order.id} value={order.id}>#{order.id} - {order.customerName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Product</label>
            <select
              className="form-control"
              value={formData.productId}
              onChange={(e) => setFormData({...formData, productId: e.target.value})}
            >
              <option value="">Select Product</option>
              {data.products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Machine</label>
            <select
              className="form-control"
              value={formData.machine}
              onChange={(e) => setFormData({...formData, machine: e.target.value})}
            >
              <option value="">Select Machine</option>
              {data.machines.map(machine => (
                <option key={machine.id} value={machine.name}>{machine.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Purchase Management Component
const PurchaseManagement = () => {
  const { data, addRecord, updateRecord } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  
  const [orderFormData, setOrderFormData] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    status: 'Pending',
    items: [{ material: '', quantity: '', unit: '', unitPrice: '' }]
  });

  const [supplierFormData, setSupplierFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    materials: '',
    rating: 0,
    onTimeDelivery: 0
  });

  const filteredOrders = data.purchaseOrders.filter(order => {
    const matchesSearch = order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSuppliers = data.suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderSave = () => {
    const totalAmount = orderFormData.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );

    const supplier = data.suppliers.find(s => s.id === parseInt(orderFormData.supplierId));
    const orderItems = orderFormData.items.map(item => ({
      ...item,
      quantity: parseInt(item.quantity),
      unitPrice: parseFloat(item.unitPrice)
    }));

    const newOrder = {
      id: editingOrder ? editingOrder.id : Date.now(),
      ...orderFormData,
      supplierId: parseInt(orderFormData.supplierId),
      supplierName: supplier?.name || '',
      totalAmount,
      items: orderItems
    };

    if (editingOrder) {
      updateRecord('purchaseOrders', editingOrder.id, newOrder);
    } else {
      addRecord('purchaseOrders', newOrder);
    }

    setIsOrderModalOpen(false);
    setEditingOrder(null);
    setOrderFormData({
      supplierId: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      status: 'Pending',
      items: [{ material: '', quantity: '', unit: '', unitPrice: '' }]
    });
  };

  const handleSupplierSave = () => {
    const newSupplier = {
      id: editingSupplier ? editingSupplier.id : Date.now(),
      ...supplierFormData,
      materials: supplierFormData.materials.split(',').map(m => m.trim()),
      rating: parseFloat(supplierFormData.rating),
      onTimeDelivery: parseFloat(supplierFormData.onTimeDelivery)
    };

    if (editingSupplier) {
      updateRecord('suppliers', editingSupplier.id, newSupplier);
    } else {
      addRecord('suppliers', newSupplier);
    }

    setIsSupplierModalOpen(false);
    setEditingSupplier(null);
    setSupplierFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      materials: '',
      rating: 0,
      onTimeDelivery: 0
    });
  };

  const renderRating = (rating) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <i key={i} className={`fas fa-star ${i < Math.floor(rating) ? 'star' : 'star empty'}`}></i>
        ))}
        <span className="ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button 
          className={`btn ${activeTab === 'orders' ? 'btn--primary' : 'btn--outline'}`}
          onClick={() => setActiveTab('orders')}
        >
          Purchase Orders
        </button>
        <button 
          className={`btn ${activeTab === 'suppliers' ? 'btn--primary' : 'btn--outline'}`}
          onClick={() => setActiveTab('suppliers')}
        >
          Suppliers
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="data-table">
          <div className="table-header">
            <h2 className="table-title">Purchase Orders</h2>
            <div className="table-actions">
              <input
                type="text"
                placeholder="Search orders..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="btn btn--primary" onClick={() => setIsOrderModalOpen(true)}>
                <i className="fas fa-plus"></i> New Purchase Order
              </button>
              <button className="btn btn--outline" onClick={() => exportToCSV(filteredOrders, 'purchase_orders')}>
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          
          <table className="table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.supplierName}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.deliveryDate}</td>
                  <td>
                    <span className={`status-badge status-badge--${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <button 
                      className="btn btn--sm btn--outline"
                      onClick={() => {
                        setEditingOrder(order);
                        setOrderFormData(order);
                        setIsOrderModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="data-table">
          <div className="table-header">
            <h2 className="table-title">Suppliers</h2>
            <div className="table-actions">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn--primary" onClick={() => setIsSupplierModalOpen(true)}>
                <i className="fas fa-plus"></i> Add Supplier
              </button>
              <button className="btn btn--outline" onClick={() => exportToCSV(filteredSuppliers, 'suppliers')}>
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Materials</th>
                <th>Rating</th>
                <th>On-Time Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.materials.join(', ')}</td>
                  <td>{renderRating(supplier.rating)}</td>
                  <td>{supplier.onTimeDelivery}%</td>
                  <td>
                    <button 
                      className="btn btn--sm btn--outline"
                      onClick={() => {
                        setEditingSupplier(supplier);
                        setSupplierFormData({
                          ...supplier,
                          materials: supplier.materials.join(', ')
                        });
                        setIsSupplierModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Purchase Order Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setEditingOrder(null);
          setOrderFormData({
            supplierId: '',
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: '',
            status: 'Pending',
            items: [{ material: '', quantity: '', unit: '', unitPrice: '' }]
          });
        }}
        title={editingOrder ? 'Edit Purchase Order' : 'Create New Purchase Order'}
        onSave={handleOrderSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Supplier</label>
            <select
              className="form-control"
              value={orderFormData.supplierId}
              onChange={(e) => setOrderFormData({...orderFormData, supplierId: e.target.value})}
            >
              <option value="">Select Supplier</option>
              {data.suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Order Date</label>
            <input
              type="date"
              className="form-control"
              value={orderFormData.orderDate}
              onChange={(e) => setOrderFormData({...orderFormData, orderDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Date</label>
            <input
              type="date"
              className="form-control"
              value={orderFormData.deliveryDate}
              onChange={(e) => setOrderFormData({...orderFormData, deliveryDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={orderFormData.status}
              onChange={(e) => setOrderFormData({...orderFormData, status: e.target.value})}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="mb-4">Order Items</h4>
          {orderFormData.items.map((item, index) => (
            <div key={index} className="form-grid mb-4 p-4 border rounded">
              <div className="form-group">
                <label className="form-label">Material</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.material}
                  onChange={(e) => {
                    const newItems = [...orderFormData.items];
                    newItems[index].material = e.target.value;
                    setOrderFormData({...orderFormData, items: newItems});
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...orderFormData.items];
                    newItems[index].quantity = e.target.value;
                    setOrderFormData({...orderFormData, items: newItems});
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.unit}
                  onChange={(e) => {
                    const newItems = [...orderFormData.items];
                    newItems[index].unit = e.target.value;
                    setOrderFormData({...orderFormData, items: newItems});
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={item.unitPrice}
                  onChange={(e) => {
                    const newItems = [...orderFormData.items];
                    newItems[index].unitPrice = e.target.value;
                    setOrderFormData({...orderFormData, items: newItems});
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Supplier Modal */}
      <Modal
        isOpen={isSupplierModalOpen}
        onClose={() => {
          setIsSupplierModalOpen(false);
          setEditingSupplier(null);
          setSupplierFormData({
            name: '',
            contact: '',
            email: '',
            phone: '',
            materials: '',
            rating: 0,
            onTimeDelivery: 0
          });
        }}
        title={editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        onSave={handleSupplierSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              value={supplierFormData.name}
              onChange={(e) => setSupplierFormData({...supplierFormData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Person</label>
            <input
              type="text"
              className="form-control"
              value={supplierFormData.contact}
              onChange={(e) => setSupplierFormData({...supplierFormData, contact: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={supplierFormData.email}
              onChange={(e) => setSupplierFormData({...supplierFormData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={supplierFormData.phone}
              onChange={(e) => setSupplierFormData({...supplierFormData, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Materials (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              value={supplierFormData.materials}
              onChange={(e) => setSupplierFormData({...supplierFormData, materials: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              value={supplierFormData.rating}
              onChange={(e) => setSupplierFormData({...supplierFormData, rating: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">On-Time Delivery %</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-control"
              value={supplierFormData.onTimeDelivery}
              onChange={(e) => setSupplierFormData({...supplierFormData, onTimeDelivery: e.target.value})}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Quality Control Component
const QualityControl = () => {
  const { data, addRecord, updateRecord } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCheck, setEditingCheck] = useState(null);
  
  const [formData, setFormData] = useState({
    productionOrderId: '',
    checkDate: new Date().toISOString().split('T')[0],
    inspector: '',
    edgeCrushStrength: '',
    burstStrength: '',
    moistureContent: '',
    status: 'Passed',
    remarks: ''
  });

  const filteredChecks = data.qualityChecks.filter(check => {
    const matchesSearch = check.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || check.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    const productionOrder = data.productionOrders.find(po => po.id === parseInt(formData.productionOrderId));
    
    const newCheck = {
      id: editingCheck ? editingCheck.id : Date.now(),
      ...formData,
      productionOrderId: parseInt(formData.productionOrderId),
      productName: productionOrder?.productName || '',
      edgeCrushStrength: parseFloat(formData.edgeCrushStrength),
      burstStrength: parseFloat(formData.burstStrength),
      moistureContent: parseFloat(formData.moistureContent)
    };

    if (editingCheck) {
      updateRecord('qualityChecks', editingCheck.id, newCheck);
    } else {
      addRecord('qualityChecks', newCheck);
    }

    setIsModalOpen(false);
    setEditingCheck(null);
    setFormData({
      productionOrderId: '',
      checkDate: new Date().toISOString().split('T')[0],
      inspector: '',
      edgeCrushStrength: '',
      burstStrength: '',
      moistureContent: '',
      status: 'Passed',
      remarks: ''
    });
  };

  return (
    <div>
      <div className="data-table">
        <div className="table-header">
          <h2 className="table-title">Quality Inspections</h2>
          <div className="table-actions">
            <input
              type="text"
              placeholder="Search inspections..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
            <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-plus"></i> New Inspection
            </button>
            <button className="btn btn--outline" onClick={() => exportToCSV(filteredChecks, 'quality_checks')}>
              <i className="fas fa-download"></i> Export
            </button>
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Inspection ID</th>
              <th>Production Order</th>
              <th>Product</th>
              <th>Check Date</th>
              <th>Inspector</th>
              <th>Edge Crush (kN/m)</th>
              <th>Burst Strength (kPa)</th>
              <th>Moisture %</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChecks.map(check => (
              <tr key={check.id}>
                <td>#{check.id}</td>
                <td>#{check.productionOrderId}</td>
                <td>{check.productName}</td>
                <td>{check.checkDate}</td>
                <td>{check.inspector}</td>
                <td>{check.edgeCrushStrength.toFixed(1)}</td>
                <td>{check.burstStrength}</td>
                <td>{check.moistureContent.toFixed(1)}</td>
                <td>
                  <span className={`status-badge status-badge--${check.status.toLowerCase()}`}>
                    {check.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn--sm btn--outline"
                    onClick={() => {
                      setEditingCheck(check);
                      setFormData(check);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCheck(null);
          setFormData({
            productionOrderId: '',
            checkDate: new Date().toISOString().split('T')[0],
            inspector: '',
            edgeCrushStrength: '',
            burstStrength: '',
            moistureContent: '',
            status: 'Passed',
            remarks: ''
          });
        }}
        title={editingCheck ? 'Edit Quality Inspection' : 'Create New Quality Inspection'}
        onSave={handleSave}
      >
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Production Order</label>
            <select
              className="form-control"
              value={formData.productionOrderId}
              onChange={(e) => setFormData({...formData, productionOrderId: e.target.value})}
            >
              <option value="">Select Production Order</option>
              {data.productionOrders.map(order => (
                <option key={order.id} value={order.id}>#{order.id} - {order.productName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Check Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.checkDate}
              onChange={(e) => setFormData({...formData, checkDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Inspector</label>
            <input
              type="text"
              className="form-control"
              value={formData.inspector}
              onChange={(e) => setFormData({...formData, inspector: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Edge Crush Strength (kN/m)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              value={formData.edgeCrushStrength}
              onChange={(e) => setFormData({...formData, edgeCrushStrength: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Burst Strength (kPa)</label>
            <input
              type="number"
              className="form-control"
              value={formData.burstStrength}
              onChange={(e) => setFormData({...formData, burstStrength: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Moisture Content (%)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              value={formData.moistureContent}
              onChange={(e) => setFormData({...formData, moistureContent: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="form-group" style={{gridColumn: '1 / -1'}}>
            <label className="form-label">Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Reporting Component
const Reporting = () => {
  const { data } = useAppContext();
  const [activeReport, setActiveReport] = useState('inventory');

  const reportTypes = [
    { id: 'inventory', name: 'Inventory Report', icon: 'fas fa-boxes' },
    { id: 'sales', name: 'Sales Report', icon: 'fas fa-chart-line' },
    { id: 'production', name: 'Production Report', icon: 'fas fa-cogs' },
    { id: 'quality', name: 'Quality Report', icon: 'fas fa-check-circle' }
  ];

  const generateInventoryReport = () => {
    return data.inventory.map(item => ({
      'Item Name': item.itemName,
      'Category': item.category,
      'Current Stock': `${formatNumber(item.currentStock)} ${item.unit}`,
      'Stock Value': formatCurrency(item.currentStock * (item.unitPrice || 10)),
      'Stock Status': getStockStatus(item.currentStock, item.minStock, item.maxStock),
      'Location': item.location,
      'Last Update': item.lastUpdate
    }));
  };

  const generateSalesReport = () => {
    return data.salesOrders.map(order => ({
      'Order ID': `#${order.id}`,
      'Customer': order.customerName,
      'Order Date': order.orderDate,
      'Delivery Date': order.deliveryDate,
      'Status': order.status,
      'Total Amount': formatCurrency(order.totalAmount),
      'Items': order.items.length
    }));
  };

  const generateProductionReport = () => {
    return data.productionOrders.map(order => ({
      'Production ID': `#${order.id}`,
      'Product': order.productName,
      'Quantity': formatNumber(order.quantity),
      'Start Date': order.startDate,
      'End Date': order.endDate,
      'Machine': order.machine,
      'Progress': `${order.progress}%`,
      'Status': order.status
    }));
  };

  const generateQualityReport = () => {
    return data.qualityChecks.map(check => ({
      'Inspection ID': `#${check.id}`,
      'Product': check.productName,
      'Check Date': check.checkDate,
      'Inspector': check.inspector,
      'Edge Crush (kN/m)': check.edgeCrushStrength.toFixed(1),
      'Burst Strength (kPa)': check.burstStrength,
      'Moisture (%)': check.moistureContent.toFixed(1),
      'Status': check.status,
      'Remarks': check.remarks
    }));
  };

  const getReportData = () => {
    switch (activeReport) {
      case 'inventory':
        return generateInventoryReport();
      case 'sales':
        return generateSalesReport();
      case 'production':
        return generateProductionReport();
      case 'quality':
        return generateQualityReport();
      default:
        return [];
    }
  };

  const exportReport = () => {
    const reportData = getReportData();
    const reportName = reportTypes.find(r => r.id === activeReport)?.name || 'report';
    exportToCSV(reportData, reportName.toLowerCase().replace(' ', '_'));
  };

  const currentReportData = getReportData();
  const columns = currentReportData.length > 0 ? Object.keys(currentReportData[0]) : [];

  return (
    <div>
      <div className="flex gap-4 mb-6">
        {reportTypes.map(report => (
          <button 
            key={report.id}
            className={`btn ${activeReport === report.id ? 'btn--primary' : 'btn--outline'}`}
            onClick={() => setActiveReport(report.id)}
          >
            <i className={report.icon}></i> {report.name}
          </button>
        ))}
      </div>

      <div className="data-table">
        <div className="table-header">
          <h2 className="table-title">
            {reportTypes.find(r => r.id === activeReport)?.name || 'Report'}
          </h2>
          <div className="table-actions">
            <button className="btn btn--primary" onClick={exportReport}>
              <i className="fas fa-download"></i> Export to CSV
            </button>
          </div>
        </div>
        
        {currentReportData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentReportData.map((row, index) => (
                <tr key={index}>
                  {columns.map(column => (
                    <td key={column}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p>No data available for this report.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { activeModule } = useAppContext();

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <InventoryManagement />;
      case 'sales':
        return <SalesManagement />;
      case 'production':
        return <ProductionPlanning />;
      case 'purchase':
        return <PurchaseManagement />;
      case 'quality':
        return <QualityControl />;
      case 'reports':
        return <Reporting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

// Render the application
ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('app')
);