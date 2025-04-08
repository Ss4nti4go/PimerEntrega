import { productService } from "../service/index.js";

class ProductController {
    constructor() {
        this.service = productService;
    }

    getProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const producto = await this.service.getProduct({ _id: pid });
            res.status(200).json(producto);
        } catch (error) {
            console.error(`Error al obtener el producto con ID ${pid}:`, error);
            res.status(error.code || 500).send(error.message || 'Error al obtener producto');
        }
    };

    getProducts = async (req, res) => {
        try {
            const productos = await this.service.getProducts();
            res.status(200).json(productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(error.code || 500).send('Error interno del servidor al obtener los productos');
        }
    };

    createProduct = async (req, res) => {
        try {
            const nuevoProducto = await this.service.createProduct(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(error.code || 500).send(error.message || 'Error al crear producto');
        }
    }

    updateProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const productoActualizado = await this.service.updateProduct(pid, req.body);
            res.status(200).json(productoActualizado);
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${pid}:`, error);
            res.status(error.code || 500).send(error.message || 'Error al actualizar producto');
        }
    };

    deleteProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const product = await this.service.deleteProduct(pid);
            res.status(200).send(`Producto con ID ${pid} (${product.title}) eliminado exitosamente`);
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${pid}:`, error);
            res.status(error.code || 500).send(error.message || 'Error al eliminar producto');
        }
    };
}

export default ProductController;
