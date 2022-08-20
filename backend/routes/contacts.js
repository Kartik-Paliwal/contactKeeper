const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Contacts = require("../models/Contacts");

// get all the notes using get "api/contacts/fetchallcontatcs"

router.get("/fetchallcontacts", fetchuser, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
// add note using post "/api/contacts/addcontact"  login required
router.post(
  "/addcontact",
  fetchuser,
  [
    body("name", "name should be atleast one character").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("phone", "Enter correct number").isMobilePhone(),
    body("type", "select one").exists(),
  ],
  async (req, res) => {
    try {
      const { name, email, phone, type } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      let user= await Contacts.findOne({email:req.user.email})
      if(user){
        res.json({"user exists":"user with this email exists"})
      }
      user=await Contacts.findOne({email:req.user.phone})
      if(user){
        res.json({"user exists":"user with this Phone already exists"})
      }
      const contact = new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const savedContact = await contact.save();
      
      res.json({savedContact});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// update an existing note using put "/api/contacts/updatenote"
router.put(
  "/updatecontact/:id",
  fetchuser,
  [
    body("name", "name should be atleast one character").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("phone", "Enter correct number").isMobilePhone(),
    body("type", "select one").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let contact = await Contacts.findById(req.params.id);
      // let user = await Contacts.findOne({ email: req.body.email });
      // let u1 = await Contacts.findOne({ phone: req.body.phone });
    //   if (!user) {
    //     if (!u1) {
    //       const { name, email, phone, type } = req.body;
    //       const newContact = {};
    //       if (name) {
    //         newContact.name = name;
    //       }
    //       if (email) {
    //         newContact.email = email;
    //       }
    //       if (phone) {
    //         newContact.phone = phone;
    //       }
    //       if (type) {
    //         newContact.type = type;
    //       }
    //       if (!contact) {
    //         res.status(404).send("not found");
    //       }
    //       if (contact.user.toString() !== req.user.id) {
    //         return res.status(404).send("Not allowed");
    //       }
    //       contact = await Contacts.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: newContact },
    //         { new: true }
    //       );
    //       res.send(contact);
    //     } else if (u1.id === contact.id) {
    //       const { name, email, phone, type } = req.body;
    //       const newContact = {};
    //       if (name) {
    //         newContact.name = name;
    //       }
    //       if (email) {
    //         newContact.email = email;
    //       }
    //       if (phone) {
    //         newContact.phone = phone;
    //       }
    //       if (type) {
    //         newContact.type = type;
    //       }
    //       if (!contact) {
    //         res.status(404).send("not found");
    //       }
    //       if (contact.user.toString() !== req.user.id) {
    //         return res.status(404).send("Not allowed");
    //       }
    //       contact = await Contacts.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: newContact },
    //         { new: true }
    //       );
    //       res.send(contact);
    //     } else {
    //       return res.status(400).json({
    //         error: "sorry a contact with this phone Number aready exist",
    //       });
    //     }
    //   } else {
    //     if(user.id===contact.id){
    //     if (!u1) {
    //       const { name, email, phone, type } = req.body;
    //       const newContact = {};
    //       if (name) {
    //         newContact.name = name;
    //       }
    //       if (email) {
    //         newContact.email = email;
    //       }
    //       if (phone) {
    //         newContact.phone = phone;
    //       }
    //       if (type) {
    //         newContact.type = type;
    //       }
    //       if (!contact) {
    //         res.status(404).send("not found");
    //       }
    //       if (contact.user.toString() !== req.user.id) {
    //         return res.status(404).send("Not allowed");
    //       }
    //       contact = await Contacts.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: newContact },
    //         { new: true }
    //       );
    //       res.send(contact);
    //     } else if (u1.id === contact.id) {
    //       const { name, email, phone, type } = req.body;
    //       const newContact = {};
    //       if (name) {
    //         newContact.name = name;
    //       }
    //       if (email) {
    //         newContact.email = email;
    //       }
    //       if (phone) {
    //         newContact.phone = phone;
    //       }
    //       if (type) {
    //         newContact.type = type;
    //       }
    //       if (!contact) {
    //         res.status(404).send("not found");
    //       }
    //       if (contact.user.toString() !== req.user.id) {
    //         return res.status(404).send("Not allowed");
    //       }
    //       contact = await Contacts.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: newContact },
    //         { new: true }
    //       );
    //       res.send(contact);
    //     } else {
    //       return res.status(400).json({
    //         error: "sorry a contact with this phone Number aready exist",
    //       });
    //     }
    //   } else{
    //     return res.status(400).json({
    //       error: "sorry a contact with this email aready exist",
    //     });
    //   }
    // }
    const { name, email, phone, type } = req.body;
          const newContact = {};
          if (name) {
            newContact.name = name;
          }
          if (email) {
            newContact.email = email;
          }
          if (phone) {
            newContact.phone = phone;
          }
          if (type) {
            newContact.type = type;
          }
          if (!contact) {
            res.status(404).send("not found");
          }
          if (contact.user.toString() !== req.user.id) {
            return res.status(404).send("Not allowed");
          }
          contact = await Contacts.findByIdAndUpdate(
            req.params.id,
            { $set: newContact },
            { new: true }
          );
          res.send(contact);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// delete an existing note using delete "/api/contacts/deletenote"

router.delete("/deletecontact/:id", fetchuser, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);
    if (!contact) {
      res.status(404).send("not found");
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    contact = await Contacts.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deeted" });
  } catch (error) {
    console.error(error.meaasge);
    res.status(500).send("Internal server error");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {});
module.exports = router;
