import connection from "../db.js";

export const getCustomers = async () => {
  const sql = "SELECT * FROM customers";
  const [rows] = await connection.query(sql);
  return rows;
}

export const getCustomerById = async (id) => {
  const sql = "SELECT * FROM customers WHERE customer_id = ?";
  const [rows] = await connection.execute(sql, [id]);
  return rows[0];
}

export const createCustomer = async (customer) => {
  const sql = `
    INSERT INTO customers (
      customer_id,
      company_name,
      contact_name,
      contact_title,
      address,
      city,
      region,
      postal_code,
      country,
      phone,
      fax
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await connection.execute(sql, [
    customer.customer_id,
    customer.company_name,
    customer.contact_name,
    customer.contact_title,
    customer.address,
    customer.city,
    customer.region,
    customer.postal_code,
    customer.country,
    customer.phone,
    customer.fax,
  ]);

  return result;
}

export const updateCustomer = async (id, customer) => {
  const sql = `
    UPDATE customers
    SET
      company_name = ?,
      contact_name = ?,
      contact_title = ?,
      address = ?,
      city = ?,
      region = ?,
      postal_code = ?,
      country = ?,
      phone = ?,
      fax = ?
    WHERE customer_id = ?
  `;
  const [result] = await connection.execute(sql, [
    customer.company_name,
    customer.contact_name,
    customer.contact_title,
    customer.address,
    customer.city,
    customer.region,
    customer.postal_code,
    customer.country,
    customer.phone,
    customer.fax,
    id
  ]);

  return result;
}

export const deleteCustomer = async (id) => {
  const sql = "DELETE FROM customers WHERE customer_id = ?";
  const [result] = await connection.execute(sql, [id]);
  return result;
}
