<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        // Serve the merged Vue.js SPA frontend from public root
        $frontendPath = FCPATH . 'index.html';
        
        if (file_exists($frontendPath)) {
            // Set proper content type untuk HTML
            header('Content-Type: text/html; charset=utf-8');
            return file_get_contents($frontendPath);
        }
        
        // Fallback ke welcome message jika frontend tidak ditemukan
        return view('welcome_message');
    }
}
