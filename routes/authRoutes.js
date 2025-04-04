import express from "express";
import passport from "passport";
const router = express.Router();


router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);


router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    
    res.redirect("http://localhost:3000/home");
  }
);

router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("User Authenticated!!");
    res.json({ user: req.user });
  } else {
    console.log("User Not Authenticated!!");
    res.status(401).json({ message: "Not authenticated" });
  }
});


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect("/");
  });
});

export default router;
