import { pool } from "src/database/connection";
import { ISurvey } from "../models/survey-model";

/**
 * Get all
 *
 * @returns
 */
async function getAll(): Promise<void> {
  const qb = await pool.get_connection();
  try {
    const response = await qb.get("edka_survey");
    console.log("Query Ran: " + qb.last_query());
    return response;
  } catch (err: any) {
    console.error("Uh oh! Couldn't get results: " + err.msg);
  } finally {
    qb.release();
  }
}

/**
 * Add one
 *
 * @param survey
 * @returns
 */

async function addOne(survey: ISurvey): Promise<void> {
  const qb = await pool.get_connection();
  // set generated token
  survey.token = await generateToken();
  try {
    const response = await qb.insert("edka_survey", survey);
    if (response.affected_rows === 1) {
      return await qb.get_where("edka_survey", { id: response.insert_id });
    } else {
      throw new Error("New was not added to database");
    }
  } catch (err) {
    console.error("Uh oh! Couldn't get results: " + err.msg);
  } finally {
    qb.release();
  }
}

/**
 * Update one
 *
 * @param survey
 * @returns
 */

async function updateOne(survey: ISurvey): Promise<void> {
  const qb = await pool.get_connection();
  try {
    const response = await qb.update("edka_survey", survey, { id: survey.id });
    if (response.affected_rows === 1) {
      return await qb.get_where("edka_survey", { id: survey.id });
    } else {
      throw new Error("New was not updated to database");
    }
  } catch (err) {
    console.error("Uh oh! Couldn't get results: " + err.msg);
  } finally {
    qb.release();
  }
}

/**
 * Delete one
 *
 * @param id
 * @returns
 */

async function deleteOne(id: number): Promise<void> {
  const qb = await pool.get_connection();
  try {
    const response = await qb.delete("edka_survey", { id: id });
    console.log("Query Ran: " + qb.last_query());
    return response.insert_id;
  } catch (err) {
    console.error("Uh oh! Couldn't get results: " + err.msg);
  } finally {
    qb.release();
  }
}

async function generateToken() {
  const qb = await pool.get_connection();
  let token = "";
  let is_existed = true;
  do {
    token = ("000000" + Math.floor(Math.random() * 999999) + 1).slice(-6);
    const result = await qb
      .select("token")
      .where({ token: token })
      .get("edka_survey");
    if (result.length <= 0) {
      is_existed = false;
      qb.release();
    }
  } while (is_existed);
  return token;
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
