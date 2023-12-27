require("dotenv").config();

const { Admin } = require("../models/admin.model");
const {Register} = require("../models/register.model");

const JUNIOR_ID = process.env.JUNIOR_CLASS_ID;
const SENIOR_ID = process.env.SENIOR_CLASS_ID;
const JUNIOR1 = process.env.JUNIOR_CLASS1_ID;
const JUNIOR2 = process.env.JUNIOR_CLASS2_ID;
const JUNIOR3 = process.env.JUNIOR_CLASS3_ID;
const SENIOR1 = process.env.SENIOR_CLASS1_ID;
const SENIOR2 = process.env.SENIOR_CLASS2_ID;
const SENIOR3 = process.env.SENIOR_CLASS3_ID;
const J1_TEACHER = JUNIOR_CLASS1_TEACHER_ID;
const J2_TEACHER = JUNIOR_CLASS2_TEACHER_ID;
const J3_TEACHER = JUNIOR_CLASS3_TEACHER_ID;
const S1_TEACHER = SENIOR_CLASS1_TEACHER_ID;
const S2_TEACHER = SENIOR_CLASS2_TEACHER_ID;
const S3_TEACHER = SENIOR_CLASS3_TEACHER_ID;

const getAdminData = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(500).json({ msg: "Admin doesn't exist" });
    res.status(200).json({
      image: admin.image,
      name: admin.name,
      email: admin.email,
      adminType: admin.adminType,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const AdmitStudent = async(req, res) => {
    try{
        await Register.findById(req.params.id).then(
            
            student => {
                let sectionId;
                let teacherId;
                let classId;
                if(student.classOfEntry === 'junior1' || student.classOfEntry === 'junior2' || student.classOfEntry === 'junior3') {
                    sectionId = JUNIOR_ID;
                    classId = JUNIOR_ID;
                    if(student.classOfEntry === 'junior1') {
                        classId = classId.concat(JUNIOR_CLASS1_ID);
                        teacherId = J1_TEACHER
                    } else if()
                }
            }
        )
    }catch(err){
        res.status(500).json(err);
    }
};

module.exports = {
  getAdminData,
};
