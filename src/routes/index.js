const { Router } = require('express');
const router = Router();

//Controllers
const { getUsers, postUsers, getUserByID, putUser, deleteUser } = require('../controllers/usuario.controller');
const { getCategories, postCategories, getCategoryByID, putCategory, deleteCategory } = require('../controllers/categoria.controller');
const { getProviders, postProviders, getProviderByID, putProvider, deleteProvider } = require('../controllers/proveedor.controller');
const { getRoles, postRoles, getRolByID, putRol, deleteRol } = require('../controllers/rol.controller');
const { getShops, postShops, getShopByID, putShop, deleteShop } = require('../controllers/tienda.controller');
const { getEmployees, postEmployees, getEmployeeByID, putEmployee, deleteEmployee } = require('../controllers/empleado.controller');
const { getBrands, postBrands, getBrandByID, putBrand, deleteBrand } = require('../controllers/marca.controller');
const { getBrandsCategories, postBrandsCategories, getBrandCategoryByIDS, putBrandCategory, deleteBrandCategory } = require('../controllers/marca_categoria.controller');
const { getSales, postSales, getSaleByID, putSale, deleteSale } = require('../controllers/venta.controller');
const { getPayments, postPayments, getPaymentByID, putPayment, deletePayment } = require('../controllers/pago.controller');
const { getProducts, postProducts, getProductByID, putProduct, deleteProduct } = require('../controllers/producto.controller');
const { getSaleDetails, postSaleDetail, getSaleDetailByID, putSaleDetail, deleteSaleDetail } = require('../controllers/venta_detalle.controller');
const { getPrivileges, postPrivileges, getPrivilegeByID, putPrivilege, deletePrivilege } = require('../controllers/privilegio.controller');
const { getUserRoles, postUserRoles, getUserRoleByIDS, putUserRole, deleteUserRole } = require('../controllers/usuario_rol.controller');
const { getRolePrivileges, postRolePrivilege, getRolePrivilegeByIDs, putRolePrivilege, deleteRolePrivilege } = require('../controllers/rol_privilegio.controller');


//Rutas SELECT all
router.get('/users', getUsers)
router.get('/categories', getCategories)
router.get('/providers', getProviders)
router.get('/roles', getRoles)
router.get('/shops', getShops)
router.get('/employees', getEmployees)
router.get('/brands', getBrands)
router.get('/brandsCategories', getBrandsCategories)
router.get('/sales', getSales)
router.get('/payments', getPayments)
router.get('/products', getProducts)
router.get('/saleDetails', getSaleDetails)
router.get('/privileges', getPrivileges)
router.get('/userRoles', getUserRoles)
router.get('/rolePrivileges', getRolePrivileges)

//Rutas SELECT by ID
router.get('/users/:id', getUserByID)
router.get('/categories/:id', getCategoryByID)
router.get('/providers/:id', getProviderByID)
router.get('/roles/:id', getRolByID)
router.get('/shops/:id', getShopByID)
router.get('/employees/:id', getEmployeeByID)
router.get('/brands/:id', getBrandByID)
router.get('/brandsCategories/:id_marca/:id_categoria', getBrandCategoryByIDS)
router.get('/sales/:id', getSaleByID)
router.get('/payments/:id', getPaymentByID)
router.get('/products/:id', getProductByID)
router.get('/saleDetails/:id_venta/:id_producto', getSaleDetailByID)
router.get('/privileges/:id', getPrivilegeByID)
router.get('/userRoles/:id_usuario/:id_rol', getUserRoleByIDS)
router.get('/rolePrivileges/:id_rol/:id_privilegio', getRolePrivilegeByIDs)

//Rutas INSERT
router.post('/users', postUsers)
router.post('/categories', postCategories)
router.post('/providers', postProviders)
router.post('/roles', postRoles)
router.post('/shops', postShops)
router.post('/employees', postEmployees)
router.post('/brands', postBrands)
router.post('/brandsCategories', postBrandsCategories)
router.post('/sales', postSales)
router.post('/payments', postPayments)
router.post('/products', postProducts)
router.post('/saleDetails', postSaleDetail)
router.post('/privileges', postPrivileges)
router.post('/userRoles', postUserRoles)
router.post('/rolePrivileges', postRolePrivilege)

//Rutas UPDATE
router.put('/users/:id', putUser)
router.put('/categories/:id', putCategory)
router.put('/providers/:id', putProvider)
router.put('/roles/:id', putRol)
router.put('/shops/:id', putShop)
router.put('/employees/:id', putEmployee)
router.put('/brands/:id', putBrand)
router.put('/brandsCategories/:id_marca/:id_categoria', putBrandCategory)
router.put('/sales/:id', putSale)
router.put('/payments/:id', putPayment)
router.put('/products/:id', putProduct)
router.put('/saleDetails/:id_venta/:id_producto', putSaleDetail)
router.put('/privileges/:id', putPrivilege)
router.put('/userRoles/:id_usuario/:id_rol', putUserRole)
router.put('/rolePrivileges/:id_rol/:id_privilegio', putRolePrivilege)

//Rutas DELETE
router.delete('/users/:id', deleteUser)
router.delete('/categories/:id', deleteCategory)
router.delete('/providers/:id', deleteProvider)
router.delete('/roles/:id', deleteRol)
router.delete('/shops/:id', deleteShop)
router.delete('/employees/:id', deleteEmployee)
router.delete('/brands/:id', deleteBrand)
router.delete('/brandsCategories/:id_marca/:id_categoria', deleteBrandCategory)
router.delete('/sales/:id', deleteSale)
router.delete('/payments/:id', deletePayment)
router.delete('/products/:id', deleteProduct)
router.delete('/saleDetails/:id_venta/:id_producto', deleteSaleDetail)
router.delete('/privileges/:id', deletePrivilege)
router.delete('/userRoles/:id_usuario/:id_rol', deleteUserRole)
router.delete('/rolePrivileges/:id_rol/:id_privilegio', deleteRolePrivilege)

module.exports = router;