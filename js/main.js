
/* ==========================================
   SUDEN - MAIN JAVASCRIPT ENTRY POINT
========================================== */


/* ==========================================
   1. SHARED COMPONENTS
   Loaded across the application
========================================== */

import "./components/dropdown.js";
import "./components/modal.js";
import "./components/navbar.js";
import "./components/sidebar.js";
import "./components/hero-srch.js";


/* ==========================================
   2. UTILITIES
   Reusable application functions
========================================== */

import "./utils/helpers.js";
import "./utils/storage.js";
import "./utils/validation.js";


/* ==========================================
   3. PAGE-SPECIFIC MODULES
   Only load the module required by the page
========================================== */

const page = document.body.dataset.page;

const pageModules = {

    // Public pages
    home: () => import("./pages/home.js"),
    courses: () => import("./pages/courses.js"),
    courseDetails: () => import("./pages/course-details.js"),

    // Admin pages
    adminDashboard: () => import("./pages/admin/dashboard.js"),
    adminCourses: () => import("./pages/admin/courses.js"),
    adminUsers: () => import("./pages/admin/users.js"),

    // Instructor pages
    instructorDashboard: () => import("./pages/instructor/dashboard.js"),
    instructorCourses: () => import("./pages/instructor/courses.js"),
    instructorEditor: () => import("./pages/instructor/editor.js"),

    // Student pages
    studentDashboard: () => import("./pages/student/dashboard.js"),
    studentLearning: () => import("./pages/student/learning.js"),
    studentPlayer: () => import("./pages/student/player.js"),
    studentProgress: () => import("./pages/student/progress.js")

};


/* ==========================================
   4. INITIALISE CURRENT PAGE
========================================== */

if (pageModules[page]) {
    pageModules[page]().catch(error => {
        console.error(`Failed to load ${page} module:`, error);
    });
} else {
    console.info("No page-specific JavaScript module registered.");
}
