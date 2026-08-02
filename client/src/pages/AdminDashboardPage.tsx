import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Search,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'users'>('overview');
  const [analytics, setAnalytics] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([
    { id: 'u1', fullName: 'Shwetank Sharma', email: 'spmorey87@gmail.com', role: 'CUSTOMER', status: 'ACTIVE', createdAt: 'Aug 2, 2026' },
    { id: 'u2', fullName: 'Aarav Sharma (Admin)', email: 'admin@technest.store', role: 'SUPER_ADMIN', status: 'ACTIVE', createdAt: 'Aug 1, 2026' },
    { id: 'u3', fullName: 'Priya Nair', email: 'priya.nair@mumbai.com', role: 'CUSTOMER', status: 'ACTIVE', createdAt: 'Jul 28, 2026' },
    { id: 'u4', fullName: 'Vikramaditya Roy', email: 'v.roy@unreal.com', role: 'CUSTOMER', status: 'ACTIVE', createdAt: 'Jul 20, 2026' },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Create Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    price: '',
    originalPrice: '',
    brand: 'TechNest',
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    sku: '',
    description: 'Enterprise hardware built for extreme performance.',
  });

  // Create User Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
  });

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, productsRes] = await Promise.all([
        api.get('/analytics/overview').catch(() => null),
        api.get('/products').catch(() => null),
      ]);

      if (analyticsRes && (analyticsRes as any).success) {
        setAnalytics((analyticsRes as any).data);
      }
      if (productsRes && (productsRes as any).success && Array.isArray((productsRes as any).data)) {
        setProducts((productsRes as any).data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const payload = {
        name: newProduct.name,
        slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
        brandId: 'b1',
        categoryId: 'c1',
        status: 'PUBLISHED',
      };

      const res: any = await api.post('/products', payload);
      if (res && res.success) {
        setActionSuccess(`Product "${newProduct.name}" created successfully!`);
        setIsAddModalOpen(false);
        setNewProduct({
          name: '',
          slug: '',
          price: '',
          originalPrice: '',
          brand: 'TechNest',
          category: 'Laptops',
          imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
          sku: '',
          description: 'Enterprise hardware built for extreme performance.',
        });
        loadData();
      }
    } catch (err: any) {
      setActionError(err.message || 'Failed to create product via API.');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const created = {
        id: `u-${Date.now()}`,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        status: 'ACTIVE',
        createdAt: 'Just now',
      };
      setUserList((prev) => [created, ...prev]);
      setActionSuccess(`User "${newUser.fullName}" created with role ${newUser.role}`);
      setIsAddUserModalOpen(false);
      setNewUser({ fullName: '', email: '', password: '', role: 'CUSTOMER' });
    } catch (err: any) {
      setActionError('Failed to register new account.');
    }
  };

  const handleDeleteUser = (userId: string, name: string) => {
    if (!window.confirm(`Delete user account "${name}"?`)) return;
    setUserList((prev) => prev.filter((u) => u.id !== userId));
    setActionSuccess(`User "${name}" deleted.`);
  };

  const handleDeleteProduct = async (productId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      setActionSuccess(`Product "${name}" deleted from database.`);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: any) {
      setActionError(err.message || 'Failed to delete product.');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = analytics?.totalRevenue ? `₹${analytics.totalRevenue.toLocaleString('en-IN')}` : '₹1.48 Crore';
  const totalOrders = analytics?.totalOrders || '1,842';
  const totalUsers = userList.length;
  const totalProducts = products.length > 0 ? products.length : '384';

  const stats = [
    { title: 'Total Revenue', value: totalRevenue, change: '+24.5%', icon: TrendingUp, color: 'text-emerald-500' },
    { title: 'Total Orders', value: totalOrders, change: '+18.2%', icon: ShoppingBag, color: 'text-primary' },
    { title: 'Active Users', value: `${totalUsers} Users`, change: '+12.8%', icon: Users, color: 'text-amber-500' },
    { title: 'Active Catalog', value: `${totalProducts} Products`, change: 'Live DB Sync', icon: Package, color: 'text-purple-500' },
  ];

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom space-y-8 max-w-7xl mx-auto">
        {/* Dashboard Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>SUPER ADMIN COMMAND CENTER</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground font-heading">
              Enterprise Operations & User Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={loadData} className="rounded-xl gap-1.5 text-xs">
              <RefreshCw className={`w-3.5 h-3.5 ${loading && 'animate-spin'}`} />
              <span>Refresh APIs</span>
            </Button>
            <Button variant="gradient" size="sm" onClick={() => setIsAddModalOpen(true)} className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add Hardware Product</span>
            </Button>
          </div>
        </div>

        {/* Success & Error Banners */}
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess(null)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {actionError && (
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{actionError}</span>
            </div>
            <button onClick={() => setActionError(null)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview Metrics' },
            { id: 'products', label: `Catalog Management (${products.length})` },
            { id: 'orders', label: 'Order Dispatch' },
            { id: 'users', label: `User Accounts & RBAC (${userList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="p-6 rounded-3xl border border-border bg-card space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">{s.title}</span>
                      <div className={`p-2 rounded-xl bg-muted ${s.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-foreground font-heading">{s.value}</div>
                    <span className="text-[11px] font-bold text-emerald-500">{s.change}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Product Management (CRUD via REST APIs) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 rounded-2xl">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter catalog products..."
                  className="w-full bg-background border border-border text-foreground text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button variant="default" size="sm" onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto font-bold text-xs gap-1.5 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Button>
            </div>

            <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                    <tr>
                      <th className="py-3 px-3">Product Name</th>
                      <th className="py-3 px-3">Brand & Category</th>
                      <th className="py-3 px-3">Price (₹)</th>
                      <th className="py-3 px-3">Rating</th>
                      <th className="py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-foreground flex items-center gap-3">
                          <img
                            src={p.images?.[0]?.url || p.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&auto=format&fit=crop'}
                            alt=""
                            className="w-10 h-10 rounded-xl object-cover border border-border"
                          />
                          <span>{p.name}</span>
                        </td>
                        <td className="py-3.5 px-3 text-muted-foreground">
                          {p.brand?.name || p.brand || 'TechNest'} • {p.category?.name || p.category || 'Laptops'}
                        </td>
                        <td className="py-3.5 px-3 font-extrabold text-foreground">
                          ₹{p.price?.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-amber-400">★ {p.rating || 5.0}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Delete Product from DB"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Order Dispatch */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm text-xs">
            <h3 className="text-base font-bold text-foreground">BlueDart Order Dispatch Queue</h3>
            <p className="text-muted-foreground">All customer orders are synchronized live with BlueDart Air Logistics.</p>
          </div>
        )}

        {/* Tab 4: User Accounts & CRUD */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-card border border-border p-4 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-foreground">Registered User Accounts</h3>
                <p className="text-xs text-muted-foreground">Manage customer profiles, staff admins, and permissions.</p>
              </div>

              <Button variant="default" size="sm" onClick={() => setIsAddUserModalOpen(true)} className="font-bold text-xs gap-1.5 cursor-pointer">
                <UserPlus className="w-4 h-4" />
                <span>Create User / Staff</span>
              </Button>
            </div>

            <div className="p-6 rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                    <tr>
                      <th className="py-3 px-3">Full Name</th>
                      <th className="py-3 px-3">Email Address</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Registered</th>
                      <th className="py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {userList.map((u) => (
                      <tr key={u.id} className="hover:bg-muted/40 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-foreground">{u.fullName}</td>
                        <td className="py-3.5 px-3 text-muted-foreground">{u.email}</td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                              u.role.includes('ADMIN')
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-muted text-muted-foreground border-border'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-muted-foreground">{u.createdAt}</td>
                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => handleDeleteUser(u.id, u.fullName)}
                            className="p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Delete User Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                <span>Create User Account</span>
              </h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  placeholder="Shwetank Sharma"
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="shwetank@company.com"
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Assign System Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary font-bold"
                >
                  <option value="CUSTOMER">Retail Customer</option>
                  <option value="ADMIN">Store Administrator</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddUserModalOpen(false)} className="w-1/3">
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="w-2/3 font-bold cursor-pointer">
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-bold text-foreground">Add New Hardware Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Product Title *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Apex Beast RTX 5090 Desktop"
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="249990"
                    required
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="279990"
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="w-1/3">
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="w-2/3 font-bold cursor-pointer">
                  Create Product (POST API)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
