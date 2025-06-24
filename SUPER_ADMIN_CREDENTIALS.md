# Super Admin Panel - Login Credentials

## 🔐 Super Admin Login Credentials

To access the Super Admin Panel, use the following credentials:

### **Email:** `superadmin@fleetbold.com`
### **Password:** `SuperAdmin123!`

---

## 🚀 How to Access Super Admin Panel

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Navigate to the login page:**
   - Go to `http://localhost:5173/sign-in` (or your development URL)

3. **Enter Super Admin credentials:**
   - **Email:** `superadmin@fleetbold.com`
   - **Password:** `SuperAdmin123!`

4. **Automatic redirect:**
   - After successful login, you'll be automatically redirected to the Super Admin Dashboard at `/super-admin/dashboard`

---

## 🛡️ Super Admin Features

The Super Admin Panel provides comprehensive oversight with the following features:

### 📊 **Dashboard Overview**
- Company Directory with full company management
- Real-time audit log viewer with filtering
- Disputed/Expired expense monitoring
- Plan and limit control panel
- Quick admin actions and system statistics

### 🏢 **Company Management**
- View all registered companies
- Monitor active users and vehicle counts
- Track company status (Active/Suspended/Trial)
- Access company details and billing information

### 📋 **Audit Logging**
- Global timeline of all user activities
- Filter by date, company, and action type
- View before/after snapshots of changes
- Track user actions across all modules

### 💰 **Expense Monitoring**
- Monitor disputed tolls, tickets, and invoices
- Track overdue expenses by company
- Review expense details and status
- Take action on problematic expenses

### 🎛️ **Plan Controls**
- Upgrade/downgrade company subscription plans
- Manage custom branding privileges
- Set user limits and feature access
- Configure export data retention periods

### ⚡ **Admin Actions**
- Suspend/unsuspend companies
- Reset user passwords
- View billing status across all companies
- Perform system health checks

---

## 🔧 Technical Details

### **User Authority:** `super_admin`
### **Dashboard Route:** `/super-admin/dashboard`
### **Navigation:** Automatically shown in sidebar for super admin users
### **API Endpoint:** `/api/dashboard/super-admin`

---

## 🧪 Development Notes

- The Super Admin functionality uses mock data for development
- All API calls are intercepted by the mock adapter
- Real backend integration will be needed for production
- User role checking is implemented for security

---

## 🆘 Troubleshooting

### **Can't access Super Admin Panel?**
1. Ensure you're using the correct credentials above
2. Check that mock API is enabled in `app.config.js`
3. Verify the super admin role is properly assigned
4. Clear browser storage and try again

### **Dashboard not loading?**
1. Check browser console for errors
2. Ensure all Super Admin components are properly imported
3. Verify the mock data is loading correctly

---

## 👤 Default User Accounts

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Super Admin** | `superadmin@fleetbold.com` | `SuperAdmin123!` | Full platform access |
| **Admin** | `admin@fleetbold.com` | `123Qwe` | Company-level access |

---

*Last updated: January 2024* 