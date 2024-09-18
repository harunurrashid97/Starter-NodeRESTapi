import { DataTypes } from 'sequelize';

export const createUserModel = (sequelize) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true 
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, 
                notEmpty: true 
            }
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true 
            }
        },
        empId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true 
            }
        }
    }, {
        timestamps: true,
        tableName: 'users',
        hooks: {
            beforeSave: (user) => {
                user.email = user.email.toLowerCase();
            }
        }
    });

    return User;
};
