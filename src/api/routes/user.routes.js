const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION, USER_TYPES } = require("../../service/enums/enums");
const { authenticateToken, authPermission, authUserType } = require("../../service/controllers/middleware/auth-controller");
const controller = require("../../service/controllers/user-controller");
const authcontroller = require("../../service/controllers/token-controller");

const router = express.Router();
router.use(bodyParser.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             type: number
 *             enum:
 *               - READ
 *               - WRITE
 *               - UPDATE
 *               - DELETE
 *       required:
 *         - username
 *         - password
 *         - email
 *         - role
 *         - permissions
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.get(
  "/",
  authenticateToken,
  authPermission(PERMISSION.READ),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.getUsers
);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '404':
 *         description: Authentication Failed
 */

router.post(
  "/", 
  authenticateToken, 
  authPermission(PERMISSION.READ), 
  authUserType([USER_TYPES.ADMIN]), 
  controller.createUser
);

/**
 * @swagger
 * /api/user/auth:
 *   post:
 *     summary: Authenticate a user
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User credentials for authentication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '404':
 *         description: Authentication Failed
 */

router.post("/auth", authcontroller.authUser);

/**
 * @swagger
 * /api/user/{username}/{password}:
 *   get:
 *     summary: Get a user by username and password
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         type: string
 *         required: true
 *       - in: path
 *         name: password
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: User found
 *       '404':
 *         description: User not found
 */

router.get("/:username/:password", controller.getUserByUsernamePassword);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */

router.delete(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.DELETE),
  authUserType([USER_TYPES.ADMIN]),
  controller.deleteUser
);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: Updated user data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 */

router.put(
  "/:id",
  authenticateToken,
  authPermission(PERMISSION.UPDATE),
  authUserType([USER_TYPES.ADMIN]),
  controller.updateUser
);

module.exports = router;
