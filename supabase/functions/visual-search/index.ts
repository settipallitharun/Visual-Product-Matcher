import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  embedding?: number[];
}

// Sample product database with 50+ products
const products: Product[] = [
  // Electronics
  { id: "1", name: "Wireless Headphones", category: "Electronics", description: "Premium noise-canceling wireless headphones", price: 299.99, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: "2", name: "Smartphone", category: "Electronics", description: "Latest flagship smartphone with 5G", price: 999.99, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: "3", name: "Laptop", category: "Electronics", description: "Powerful ultrabook for professionals", price: 1499.99, imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: "4", name: "Smart Watch", category: "Electronics", description: "Fitness tracking smartwatch", price: 399.99, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: "5", name: "Tablet", category: "Electronics", description: "10-inch tablet for work and play", price: 649.99, imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400" },
  { id: "6", name: "Camera", category: "Electronics", description: "Professional DSLR camera", price: 1899.99, imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" },
  { id: "7", name: "Gaming Console", category: "Electronics", description: "Next-gen gaming console", price: 499.99, imageUrl: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400" },
  { id: "8", name: "Bluetooth Speaker", category: "Electronics", description: "Portable waterproof speaker", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
  { id: "9", name: "E-Reader", category: "Electronics", description: "Digital book reader with backlight", price: 139.99, imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400" },
  { id: "10", name: "Drone", category: "Electronics", description: "4K camera drone", price: 899.99, imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400" },
  
  // Fashion
  { id: "11", name: "Running Shoes", category: "Fashion", description: "Lightweight performance running shoes", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: "12", name: "Leather Jacket", category: "Fashion", description: "Classic leather jacket", price: 399.99, imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { id: "13", name: "Sunglasses", category: "Fashion", description: "Polarized designer sunglasses", price: 189.99, imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" },
  { id: "14", name: "Backpack", category: "Fashion", description: "Travel backpack with laptop compartment", price: 89.99, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: "15", name: "Wristwatch", category: "Fashion", description: "Automatic mechanical watch", price: 599.99, imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400" },
  { id: "16", name: "Handbag", category: "Fashion", description: "Designer leather handbag", price: 449.99, imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: "17", name: "Sneakers", category: "Fashion", description: "Casual lifestyle sneakers", price: 99.99, imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400" },
  { id: "18", name: "Wallet", category: "Fashion", description: "Minimalist leather wallet", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400" },
  { id: "19", name: "Belt", category: "Fashion", description: "Premium leather belt", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1624222247344-70d8e32f9b4d?w=400" },
  { id: "20", name: "Scarf", category: "Fashion", description: "Cashmere winter scarf", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  
  // Home & Garden
  { id: "21", name: "Coffee Maker", category: "Home", description: "Automatic espresso machine", price: 299.99, imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400" },
  { id: "22", name: "Vacuum Cleaner", category: "Home", description: "Robot vacuum with mapping", price: 449.99, imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400" },
  { id: "23", name: "Blender", category: "Home", description: "High-speed blender for smoothies", price: 149.99, imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400" },
  { id: "24", name: "Air Purifier", category: "Home", description: "HEPA air purifier", price: 249.99, imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" },
  { id: "25", name: "Desk Lamp", category: "Home", description: "LED desk lamp with USB charging", price: 59.99, imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
  { id: "26", name: "Plant Pot", category: "Garden", description: "Ceramic plant pot with drainage", price: 29.99, imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
  { id: "27", name: "Garden Tools Set", category: "Garden", description: "Complete gardening tool set", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" },
  { id: "28", name: "Throw Pillow", category: "Home", description: "Decorative throw pillow", price: 24.99, imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400" },
  { id: "29", name: "Wall Clock", category: "Home", description: "Modern minimalist wall clock", price: 39.99, imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400" },
  { id: "30", name: "Rug", category: "Home", description: "Wool area rug", price: 199.99, imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400" },
  
  // Sports & Outdoors
  { id: "31", name: "Yoga Mat", category: "Sports", description: "Non-slip yoga mat", price: 39.99, imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
  { id: "32", name: "Dumbbells", category: "Sports", description: "Adjustable dumbbell set", price: 149.99, imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400" },
  { id: "33", name: "Bicycle", category: "Outdoors", description: "Mountain bike", price: 899.99, imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400" },
  { id: "34", name: "Camping Tent", category: "Outdoors", description: "4-person camping tent", price: 199.99, imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400" },
  { id: "35", name: "Hiking Backpack", category: "Outdoors", description: "50L hiking backpack", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1622260614927-58fb2a11fa1b?w=400" },
  { id: "36", name: "Water Bottle", category: "Sports", description: "Insulated water bottle", price: 34.99, imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
  { id: "37", name: "Tennis Racket", category: "Sports", description: "Professional tennis racket", price: 179.99, imageUrl: "https://images.unsplash.com/photo-1617083278658-4d10d8b0e991?w=400" },
  { id: "38", name: "Basketball", category: "Sports", description: "Official size basketball", price: 29.99, imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400" },
  { id: "39", name: "Ski Goggles", category: "Outdoors", description: "Anti-fog ski goggles", price: 89.99, imageUrl: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400" },
  { id: "40", name: "Sleeping Bag", category: "Outdoors", description: "Cold-weather sleeping bag", price: 149.99, imageUrl: "https://images.unsplash.com/photo-1520095972714-909e91b038e5?w=400" },
  
  // Books & Media
  { id: "41", name: "Fiction Novel", category: "Books", description: "Bestselling fiction novel", price: 24.99, imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400" },
  { id: "42", name: "Cookbook", category: "Books", description: "Gourmet cooking recipes", price: 34.99, imageUrl: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400" },
  { id: "43", name: "Art Prints", category: "Media", description: "Set of abstract art prints", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400" },
  { id: "44", name: "Vinyl Record", category: "Media", description: "Classic rock vinyl record", price: 29.99, imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400" },
  { id: "45", name: "Board Game", category: "Games", description: "Strategy board game", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1611891487552-c8bfe0e9af60?w=400" },
  { id: "46", name: "Puzzle", category: "Games", description: "1000-piece jigsaw puzzle", price: 19.99, imageUrl: "https://images.unsplash.com/photo-1609783991198-0c67a6f9d5f2?w=400" },
  { id: "47", name: "Comic Book", category: "Books", description: "Superhero comic book series", price: 14.99, imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400" },
  { id: "48", name: "Magazine Subscription", category: "Media", description: "Annual magazine subscription", price: 59.99, imageUrl: "https://images.unsplash.com/photo-1573164713347-4f263880c587?w=400" },
  { id: "49", name: "Music Album", category: "Media", description: "Digital album download", price: 9.99, imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400" },
  { id: "50", name: "Audiobook", category: "Books", description: "Bestselling audiobook", price: 19.99, imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400" },
  
  // Beauty & Personal Care
  { id: "51", name: "Skincare Set", category: "Beauty", description: "Complete skincare routine set", price: 89.99, imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400" },
  { id: "52", name: "Hair Dryer", category: "Personal Care", description: "Professional ionic hair dryer", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
  { id: "53", name: "Perfume", category: "Beauty", description: "Luxury fragrance 100ml", price: 149.99, imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },
  { id: "54", name: "Makeup Palette", category: "Beauty", description: "Eyeshadow palette", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
  { id: "55", name: "Electric Toothbrush", category: "Personal Care", description: "Rechargeable electric toothbrush", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400" },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const formData = await req.formData();
    const minScore = parseFloat(formData.get('minScore') as string || '0');
    const imageFile = formData.get('image') as File;
    const imageUrl = formData.get('imageUrl') as string;

    let imageBase64 = '';

    // Process uploaded image or URL
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      imageBase64 = btoa(String.fromCharCode(...bytes));
    } else if (imageUrl) {
      // Fetch image from URL and convert to base64
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch image from URL');
      }
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      imageBase64 = btoa(String.fromCharCode(...bytes));
    } else {
      throw new Error('No image provided');
    }

    // Use Gemini 2.5 Flash API for vision analysis
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: "Describe this product image in detail. Focus on: 1) Product category (electronics, fashion, home, sports, books, beauty), 2) Visual features (colors, shapes, style), 3) Key identifying characteristics. Be specific and detailed."
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64
                }
              }
            ]
          }]
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error('Failed to analyze image with Gemini');
    }

    const geminiData = await geminiResponse.json();
    const imageDescription = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('Image description:', imageDescription);

    // Calculate similarity scores using text-based matching
    const results = products.map(product => {
      const productText = `${product.category} ${product.name} ${product.description}`.toLowerCase();
      const descriptionLower = imageDescription.toLowerCase();
      
      // Simple keyword matching for similarity
      const keywords = descriptionLower.split(/\s+/);
      let matchScore = 0;
      
      keywords.forEach((keyword: string) => {
        if (keyword.length > 3 && productText.includes(keyword)) {
          matchScore += 1;
        }
      });
      
      // Category boost
      if (descriptionLower.includes(product.category.toLowerCase())) {
        matchScore += 5;
      }
      
      // Normalize score to 0-1 range
      const similarity = Math.min(matchScore / 10, 1);
      
      return {
        ...product,
        similarity
      };
    });

    // Filter and sort results
    const filteredResults = results
      .filter(r => r.similarity >= minScore)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20);

    return new Response(
      JSON.stringify({ 
        results: filteredResults,
        imageDescription
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in visual-search function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});