import { UserModel } from '../postgres/postgres.js';

// Get All Employees
export const getAllEmp = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Add Employee
export const addEmp = async (req, res) => {
    const { name, email, designation, empId } = req.body;

    if (!name || !email || !designation || !empId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const emp = await UserModel.findOne({ where: { empId } });

        if (!emp) {
            await UserModel.create(req.body);
            return res.status(201).json({ message: 'Employee added successfully' });
        }

        return res.status(409).json({ message: 'Employee already exists' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Update Employee
export const updateEmp = async (req, res) => {
    const { empId } = req.params;

    if (!empId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    try {
        const [updatedRows] = await UserModel.update(req.body, { where: { empId } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Delete Employee
export const deleteEmp = async (req, res) => {
    const { empId } = req.params;

    if (!empId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    try {
        const deletedRows = await UserModel.destroy({ where: { empId } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
