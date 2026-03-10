// ================================================================
// TrashItt AI v3.0 — ULTIMATE ACCURACY Waste Scanner
// ================================================================
// STRATEGY:
// 1. Force AI to DESCRIBE what it sees first (shape, color, material)
// 2. Then classify based on its own description
// 3. Self-verify: ask "does my classification match what I described?"
// 4. If uncertain, run a second focused pass
// ================================================================

const GEMINI_API_KEY = "AIzaSyCuad4e_2NG_c9A_45VGIoooNs7ghaSQ7Q";

// Use gemini-2.0-flash for primary, gemini-1.5-flash as backup
const PRIMARY_MODEL = "gemini-2.0-flash";
const BACKUP_MODEL = "gemini-1.5-flash";

function getAPIURL(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

// ================================================================
// THE KEY TO ACCURACY: Force AI to SEE before it CLASSIFIES
// ================================================================
const ANALYSIS_PROMPT = `You are an expert waste identification AI for India. Your job is to identify waste items from photos with MAXIMUM accuracy.

IMPORTANT: Follow these steps IN ORDER. Do NOT skip any step.

STEP 1 — DESCRIBE WHAT YOU PHYSICALLY SEE:
Look at the image and describe:
- What SHAPE do you see? (round, cylindrical, flat, irregular, rectangular, crumpled)
- What COLOR is it? (transparent, brown, green, white, yellow, silver, black, colorful)
- What MATERIAL does it look like? (plastic, glass, metal, paper/cardboard, organic matter, fabric, electronic/circuit, ceramic)
- What SIZE does it appear to be?
- What TEXTURE? (smooth, rough, shiny, matte, wet, dry, crumpled, torn)
- Any TEXT, BRAND NAMES, or LABELS visible?
- What CONDITION? (empty, full, crushed, torn, peeled, eaten, broken, used, new, expired, rotten)

STEP 2 — IDENTIFY THE SPECIFIC ITEM:
Based on your description above, what EXACTLY is this item?
Be VERY specific:
- If cylindrical + transparent/colored plastic + has cap → "Plastic Water Bottle" or "PET Soft Drink Bottle"
- If cylindrical + glass + transparent/green/brown → "Glass Bottle"
- If cylindrical + metal + silver/aluminum → "Aluminum Can" or "Tin Can"
- If yellow/brown curved soft skin → "Banana Peel"
- If flat + white/printed + thin → "Newspaper" or "Paper Sheet" or "Document"
- If brown + corrugated + box shape → "Cardboard Box"
- If rectangular + screen/buttons/electronic → "Mobile Phone" or "Remote Control"
- If small + cylindrical + metallic → "Battery (AA/AAA)"
- If white/colored + round + has holder base → "Light Bulb (CFL/LED)"
- If colorful + thin + sealed/torn packet → "Chips Packet" or "Biscuit Wrapper" or "Candy Wrapper"
- If organic + food residue + irregular shape → identify the specific food item

STEP 3 — CLASSIFY INTO CORRECT CATEGORY:
Based on the MATERIAL (not the shape or color), classify:

🟢 WET WASTE (Green Bin) = ORGANIC/BIODEGRADABLE material:
- ALL food items (cooked or raw): rice, roti, bread, vegetables, fruits, meat, fish, eggs
- ALL fruit/vegetable PEELS and SKINS: banana peel, orange peel, potato peel, onion skin, mango skin
- ALL fruit CORES and SEEDS: apple core, mango seed, avocado pit
- Tea leaves, coffee grounds, used tea bags
- Dairy: spoiled milk, expired curd, paneer pieces
- Garden: leaves, flowers, grass, small branches
- Coconut shell, coconut husk, sugarcane pieces, nut shells
- Used paper napkins, tissues (contaminated with food)
- Hair, dust from sweeping, sawdust
- Eggshells, bones (small), fish bones

🔵 DRY WASTE (Blue Bin) = RECYCLABLE NON-BIODEGRADABLE material:
- ALL plastic items: bottles, bags, containers, cups, straws, wrappers, packets, toys
- ALL paper items (CLEAN, not food-stained): newspaper, magazines, cardboard, books, envelopes, cartons
- ALL glass items: bottles, jars, broken glass, mirrors, bangles
- ALL metal items: cans, foil (clean), bottle caps, wires, utensils, keys, coins
- Cloth/textile: old clothes, shoes, bags, curtains
- Rubber: bands, slippers, gloves
- Thermocol, styrofoam, bubble wrap
- Tetra packs (juice boxes like Frooti, Real)
- CDs, DVDs, pens, pencils

🔴 HAZARDOUS WASTE (Red Bin) = TOXIC/DANGEROUS material:
- ALL batteries (any type/size)
- ALL electronics: phones, chargers, cables, earphones, circuit boards, keyboards
- ALL light bulbs: CFL, LED, tube lights, fluorescent
- ALL medicines: strips, tablets, capsules, syrups, syringes, needles
- ALL chemicals: paint, thinner, bleach, acid, pesticides, insecticides
- Cosmetics with chemicals: nail polish, hair dye, expired perfume, aerosol cans
- Motor oil, brake fluid, thermometers
- Cigarette butts, matchsticks (chemical-tipped)
- Printer cartridges, toner

STEP 4 — SELF-VERIFY:
Ask yourself: "Does my classification MATCH the material I described in Step 1?"
- If I said material is PLASTIC → it should be DRY WASTE (Blue), NOT wet
- If I said material is ORGANIC/FOOD → it should be WET WASTE (Green), NOT dry
- If I said material is ELECTRONIC/CHEMICAL → it should be HAZARDOUS (Red)
- If I said material is GLASS/METAL/PAPER → it should be DRY WASTE (Blue)

If there is a CONFLICT, trust the MATERIAL over everything else.

NOW OUTPUT ONLY THIS JSON (no markdown, no code blocks, no explanation, no steps — JUST the JSON):

{
  "name": "Specific item name you identified in Step 2",
  "category": "Wet Waste" or "Dry Waste" or "Hazardous Waste",
  "categoryColor": "#16a34a" or "#2563eb" or "#dc2626",
  "categoryBg": "rgba(22,163,74,0.1)" or "rgba(37,99,235,0.1)" or "rgba(220,38,38,0.1)",
  "categoryEmoji": "🟢" or "🔵" or "🔴",
  "binColor": "Green" or "Blue" or "Red",
  "recyclable": true or false,
  "biodegradable": true or false,
  "hazardous": true or false,
  "correctBin": "Wet Waste Bin (Green)" or "Dry Waste Bin (Blue)" or "Hazardous Waste Bin (Red)",
  "tip": "Specific disposal instructions for this exact item. Start with action verb. For hazardous start with ⚠️ WARNING:",
  "materialSeen": "What material you identified (plastic/glass/metal/paper/organic/electronic/chemical)",
  "confidence": "High" or "Medium" or "Low"
}`;

// ================================================================
// VERIFICATION PROMPT — Second pass for uncertain results
// ================================================================
const VERIFY_PROMPT = `Look at this image ONE MORE TIME very carefully.

I need you to focus ONLY on identifying the MATERIAL the object is made of:

1. Is it PLASTIC? (smooth, lightweight, possibly transparent or colored, flexible or rigid)
2. Is it GLASS? (transparent, hard, heavy, smooth, possibly has liquid inside)
3. Is it METAL? (shiny, hard, metallic surface, possibly aluminum or steel)
4. Is it PAPER/CARDBOARD? (thin, flat, fibrous texture, possibly printed, foldable)
5. Is it ORGANIC/FOOD? (natural texture, possibly wet, irregular shape, food-like appearance)
6. Is it ELECTRONIC? (has circuits, wires, buttons, screen, battery compartment)
7. Is it FABRIC/CLOTH? (soft, woven texture, flexible)

Based on the MATERIAL:
- Plastic, Glass, Metal, Paper, Cardboard, Cloth, Rubber → DRY WASTE (Blue Bin)
- Food, Fruit peel, Vegetable, Plant matter, Organic → WET WASTE (Green Bin)  
- Electronic, Battery, Chemical, Medicine → HAZARDOUS WASTE (Red Bin)

Respond with ONLY this JSON:

{
  "name": "Specific item name",
  "category": "Wet Waste" or "Dry Waste" or "Hazardous Waste",
  "categoryColor": "#16a34a" or "#2563eb" or "#dc2626",
  "categoryBg": "rgba(22,163,74,0.1)" or "rgba(37,99,235,0.1)" or "rgba(220,38,38,0.1)",
  "categoryEmoji": "🟢" or "🔵" or "🔴",
  "binColor": "Green" or "Blue" or "Red",
  "recyclable": true or false,
  "biodegradable": true or false,
  "hazardous": true or false,
  "correctBin": "Wet Waste Bin (Green)" or "Dry Waste Bin (Blue)" or "Hazardous Waste Bin (Red)",
  "tip": "Specific disposal instructions",
  "materialSeen": "The material you identified",
  "confidence": "High" or "Medium" or "Low"
}`;

// ================================================================
// MAIN FUNCTION
// ================================================================
export async function analyzeWaste(imageFile) {
  if (!imageFile) {
    throw new Error("No image file provided");
  }

  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"];
  if (!validTypes.includes(imageFile.type)) {
    throw new Error("Unsupported image format. Please use JPG, PNG, or WEBP.");
  }

  if (imageFile.size > 20 * 1024 * 1024) {
    throw new Error("Image too large. Maximum size is 20MB.");
  }

  // Compress image if too large for better API performance
  let base64Image;
  let mimeType = imageFile.type;

  if (imageFile.size > 4 * 1024 * 1024) {
    console.log("📐 Image is large, compressing for better results...");
    const compressed = await compressImage(imageFile, 1920, 0.85);
    base64Image = compressed.base64;
    mimeType = "image/jpeg";
    console.log("📐 Compressed:", (imageFile.size / 1024).toFixed(0), "KB →", (compressed.size / 1024).toFixed(0), "KB");
  } else {
    base64Image = await fileToBase64(imageFile);
  }

  console.log("🤖 TrashItt AI v3.0 — Starting analysis...");
  console.log("📁 File:", imageFile.name, "| Size:", (imageFile.size / 1024).toFixed(1), "KB");

  // ============ PASS 1: Full Analysis ============
  let result1 = null;
  let pass1Error = null;

  try {
    console.log("🔍 Pass 1: Primary analysis with", PRIMARY_MODEL);
    const response1 = await callGeminiAPI(base64Image, mimeType, ANALYSIS_PROMPT, PRIMARY_MODEL);
    result1 = parseGeminiResponse(response1);
    console.log("✅ Pass 1:", result1.name, "→", result1.category, "| Material:", result1.materialSeen || "unknown", "| Confidence:", result1.confidence || "unknown");
  } catch (err) {
    console.warn("⚠️ Pass 1 with", PRIMARY_MODEL, "failed:", err.message);
    pass1Error = err;

    // Try backup model
    try {
      console.log("🔄 Trying backup model:", BACKUP_MODEL);
      const response1b = await callGeminiAPI(base64Image, mimeType, ANALYSIS_PROMPT, BACKUP_MODEL);
      result1 = parseGeminiResponse(response1b);
      console.log("✅ Backup model result:", result1.name, "→", result1.category);
      pass1Error = null;
    } catch (err2) {
      console.error("❌ Backup model also failed:", err2.message);
      throw pass1Error;
    }
  }

  // ============ VALIDATION ============
  const needsVerification = shouldVerify(result1);

  if (!needsVerification) {
    console.log("🎯 High confidence result, no verification needed");
    return cleanFinalResult(result1);
  }

  // ============ PASS 2: Verification ============
  console.log("🔄 Pass 2: Verification pass (result was uncertain)...");

  try {
    const response2 = await callGeminiAPI(base64Image, mimeType, VERIFY_PROMPT, PRIMARY_MODEL);
    const result2 = parseGeminiResponse(response2);
    console.log("✅ Pass 2:", result2.name, "→", result2.category, "| Material:", result2.materialSeen || "unknown");

    // Decide which result to use
    const finalResult = pickBestResult(result1, result2);
    console.log("🏆 Final decision:", finalResult.name, "→", finalResult.category);
    return cleanFinalResult(finalResult);
  } catch (err) {
    console.warn("⚠️ Pass 2 failed, using Pass 1 result:", err.message);
    return cleanFinalResult(result1);
  }
}

// ================================================================
// SHOULD VERIFY — Determines if a second pass is needed
// ================================================================
function shouldVerify(result) {
  if (!result) return true;
  if (result.name === "Unidentified Waste") return true;
  if (result.confidence === "Low") return true;

  const name = (result.name || "").toLowerCase().trim();

  // Too generic
  if (name.length <= 5) return true;

  const vagueNames = [
    "waste", "item", "object", "thing", "stuff", "material",
    "garbage", "trash", "rubbish", "junk", "debris", "unknown",
    "food", "fruit", "vegetable", "plastic", "paper", "metal", "glass",
    "bottle", "can", "box", "bag", "container", "wrapper", "packet",
    "piece", "scrap", "chunk", "bit", "part", "something",
  ];

  if (vagueNames.includes(name)) return true;

  // Single word and short — likely too generic
  if (!name.includes(" ") && name.length < 10) return true;

  // Check for material-category mismatch (the main accuracy issue!)
  const material = (result.materialSeen || "").toLowerCase();
  if (material) {
    const materialCategoryMap = {
      "plastic": "Dry Waste",
      "glass": "Dry Waste",
      "metal": "Dry Waste",
      "paper": "Dry Waste",
      "cardboard": "Dry Waste",
      "cloth": "Dry Waste",
      "fabric": "Dry Waste",
      "rubber": "Dry Waste",
      "organic": "Wet Waste",
      "food": "Wet Waste",
      "electronic": "Hazardous Waste",
      "chemical": "Hazardous Waste",
      "battery": "Hazardous Waste",
    };

    for (const [mat, expectedCat] of Object.entries(materialCategoryMap)) {
      if (material.includes(mat) && result.category !== expectedCat) {
        console.log("⚠️ Material-category mismatch! Material:", material, "Category:", result.category, "Expected:", expectedCat);
        return true;
      }
    }
  }

  return false;
}

// ================================================================
// PICK BEST RESULT — Compare two passes and pick the better one
// ================================================================
function pickBestResult(result1, result2) {
  // If result2 has higher confidence, prefer it
  const confScore = { "High": 3, "Medium": 2, "Low": 1 };
  const score1 = confScore[result1.confidence] || 1;
  const score2 = confScore[result2.confidence] || 1;

  // If result2 is more specific (longer name), prefer it
  const name1 = (result1.name || "").trim();
  const name2 = (result2.name || "").trim();

  // Check material consistency in result2
  const mat2 = (result2.materialSeen || "").toLowerCase();
  let mat2Consistent = true;

  if (mat2.includes("plastic") && result2.category !== "Dry Waste") mat2Consistent = false;
  if (mat2.includes("glass") && result2.category !== "Dry Waste") mat2Consistent = false;
  if (mat2.includes("metal") && result2.category !== "Dry Waste") mat2Consistent = false;
  if (mat2.includes("organic") && result2.category !== "Wet Waste") mat2Consistent = false;
  if (mat2.includes("food") && result2.category !== "Wet Waste") mat2Consistent = false;
  if (mat2.includes("electronic") && result2.category !== "Hazardous Waste") mat2Consistent = false;

  // If result2 is consistent and more confident, use it
  if (mat2Consistent && score2 >= score1) {
    return result2;
  }

  // If result1 name is "Unidentified" but result2 isn't, use result2
  if (name1 === "Unidentified Waste" && name2 !== "Unidentified Waste") {
    return result2;
  }

  // If result2 has more specific name
  if (name2.includes(" ") && !name1.includes(" ") && mat2Consistent) {
    return result2;
  }

  // Check material consistency in result1
  const mat1 = (result1.materialSeen || "").toLowerCase();
  if (mat1.includes("plastic") && result1.category !== "Dry Waste") {
    // Result1 has mismatch, fix the category
    result1.category = "Dry Waste";
    result1.categoryColor = "#2563eb";
    result1.categoryBg = "rgba(37,99,235,0.1)";
    result1.categoryEmoji = "🔵";
    result1.binColor = "Blue";
    result1.correctBin = "Dry Waste Bin (Blue)";
    result1.recyclable = true;
    result1.biodegradable = false;
    result1.hazardous = false;
  }
  if (mat1.includes("organic") && result1.category !== "Wet Waste") {
    result1.category = "Wet Waste";
    result1.categoryColor = "#16a34a";
    result1.categoryBg = "rgba(22,163,74,0.1)";
    result1.categoryEmoji = "🟢";
    result1.binColor = "Green";
    result1.correctBin = "Wet Waste Bin (Green)";
    result1.recyclable = false;
    result1.biodegradable = true;
    result1.hazardous = false;
  }

  return result1;
}

// ================================================================
// CLEAN FINAL RESULT — Remove internal fields, ensure format
// ================================================================
function cleanFinalResult(result) {
  const cleaned = { ...result };
  delete cleaned.materialSeen;
  delete cleaned.confidence;
  return cleaned;
}

// ================================================================
// CALL GEMINI API
// ================================================================
async function callGeminiAPI(base64Image, mimeType, promptText, model) {
  const url = getAPIURL(model);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: promptText },
          { inline_data: { mime_type: mimeType, data: base64Image } }
        ]
      }],
      generationConfig: {
        temperature: 0.02,
        topK: 10,
        topP: 0.9,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData?.error?.message || "";
    console.error("❌ API Error:", response.status, errorMsg);

    if (response.status === 400) {
      if (errorMsg.includes("not found") || errorMsg.includes("does not exist")) {
        throw new Error("MODEL_NOT_FOUND");
      }
      throw new Error("Cannot process this image. Try a clearer, well-lit photo.");
    }
    if (response.status === 403) throw new Error("API key invalid. Get a new one at aistudio.google.com/apikey");
    if (response.status === 429) throw new Error("Rate limit reached. Please wait 30 seconds.");
    if (response.status === 500 || response.status === 503) throw new Error("Google servers busy. Please try again.");
    throw new Error("API Error: " + response.status);
  }

  const data = await response.json();

  if (data?.candidates?.[0]?.finishReason === "SAFETY") {
    throw new Error("Image blocked by safety filters. Try a different photo.");
  }

  const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResponse) {
    throw new Error("Empty response from AI. Try a clearer photo.");
  }

  return textResponse;
}

// ================================================================
// IMAGE COMPRESSION — Better results with optimized images
// ================================================================
function compressImage(file, maxDimension, quality) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              base64: reader.result.split(",")[1],
              size: blob.size,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image for compression"));

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ================================================================
// FILE TO BASE64
// ================================================================
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

// ================================================================
// PARSE GEMINI RESPONSE
// ================================================================
function parseGeminiResponse(text) {
  let cleanText = text.trim();

  cleanText = cleanText.replace(/```json\s*/gi, "");
  cleanText = cleanText.replace(/```javascript\s*/gi, "");
  cleanText = cleanText.replace(/```\s*/g, "");
  cleanText = cleanText.replace(/^json\s*/i, "");
  cleanText = cleanText.trim();

  const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("❌ No JSON in response:", cleanText.slice(0, 300));
    return buildFallbackFromText(cleanText);
  }

  try {
    let jsonString = jsonMatch[0];
    jsonString = jsonString.replace(/,\s*}/g, "}");
    jsonString = jsonString.replace(/,\s*]/g, "]");
    jsonString = jsonString.replace(/\n/g, " ");
    jsonString = jsonString.replace(/\t/g, " ");
    // Fix unescaped quotes inside strings
    jsonString = jsonString.replace(/:\s*"([^"]*)"([^",}\]]*)"([^"]*?)"/g, ': "$1\'$2\'$3"');

    const parsed = JSON.parse(jsonString);
    return normalizeResult(parsed);
  } catch (parseError) {
    console.error("❌ JSON parse error:", parseError.message);
    return buildFallbackFromText(cleanText);
  }
}

// ================================================================
// NORMALIZE RESULT
// ================================================================
function normalizeResult(parsed) {
  const categoryMap = {
    "wet": "Wet Waste", "wet waste": "Wet Waste", "green": "Wet Waste",
    "green bin": "Wet Waste", "organic": "Wet Waste", "biodegradable": "Wet Waste",
    "compostable": "Wet Waste",
    "dry": "Dry Waste", "dry waste": "Dry Waste", "blue": "Dry Waste",
    "blue bin": "Dry Waste", "recyclable": "Dry Waste",
    "hazardous": "Hazardous Waste", "hazardous waste": "Hazardous Waste",
    "red": "Hazardous Waste", "red bin": "Hazardous Waste",
    "e-waste": "Hazardous Waste", "ewaste": "Hazardous Waste",
    "toxic": "Hazardous Waste", "dangerous": "Hazardous Waste",
    "medical waste": "Hazardous Waste",
  };

  const rawCat = (parsed.category || "").toLowerCase().trim();
  let category = categoryMap[rawCat] || null;

  // If category not recognized, use material to determine
  if (!category) {
    const material = (parsed.materialSeen || parsed.material || "").toLowerCase();
    category = guessCategoryFromMaterial(material) || smartCategoryGuess(parsed.name || "") || "Dry Waste";
  }

  // Double-check: does the material match the category?
  const material = (parsed.materialSeen || parsed.material || "").toLowerCase();
  if (material) {
    const materialCategory = guessCategoryFromMaterial(material);
    if (materialCategory && materialCategory !== category) {
      console.log("🔧 Fixing mismatch: material='" + material + "' suggests", materialCategory, "but category was", category);
      category = materialCategory;
    }
  }

  const meta = {
    "Wet Waste": {
      categoryColor: "#16a34a",
      categoryBg: "rgba(22,163,74,0.1)",
      categoryEmoji: "🟢",
      binColor: "Green",
      correctBin: "Wet Waste Bin (Green)",
    },
    "Dry Waste": {
      categoryColor: "#2563eb",
      categoryBg: "rgba(37,99,235,0.1)",
      categoryEmoji: "🔵",
      binColor: "Blue",
      correctBin: "Dry Waste Bin (Blue)",
    },
    "Hazardous Waste": {
      categoryColor: "#dc2626",
      categoryBg: "rgba(220,38,38,0.1)",
      categoryEmoji: "🔴",
      binColor: "Red",
      correctBin: "Hazardous Waste Bin (Red)",
    },
  };

  const m = meta[category];

  let itemName = parsed.name || parsed.itemName || "Unidentified Waste";
  itemName = itemName.trim().replace(/\b\w/g, (c) => c.toUpperCase());

  let tip = parsed.tip || parsed.disposalTip || "";
  if (!tip || tip.length < 20) {
    tip = getDefaultTip(category, itemName);
  }
  if (category === "Hazardous Waste" && !tip.includes("⚠️") && !tip.includes("WARNING")) {
    tip = "⚠️ WARNING: " + tip;
  }

  return {
    name: itemName,
    category: category,
    categoryColor: m.categoryColor,
    categoryBg: m.categoryBg,
    categoryEmoji: m.categoryEmoji,
    binColor: m.binColor,
    recyclable: typeof parsed.recyclable === "boolean" ? parsed.recyclable : category === "Dry Waste",
    biodegradable: typeof parsed.biodegradable === "boolean" ? parsed.biodegradable : category === "Wet Waste",
    hazardous: typeof parsed.hazardous === "boolean" ? parsed.hazardous : category === "Hazardous Waste",
    correctBin: parsed.correctBin || m.correctBin,
    tip: tip,
    materialSeen: parsed.materialSeen || parsed.material || "",
    confidence: parsed.confidence || "Medium",
  };
}

// ================================================================
// GUESS CATEGORY FROM MATERIAL
// ================================================================
function guessCategoryFromMaterial(material) {
  if (!material) return null;
  const m = material.toLowerCase();

  if (m.includes("plastic") || m.includes("glass") || m.includes("metal") ||
      m.includes("paper") || m.includes("cardboard") || m.includes("cloth") ||
      m.includes("fabric") || m.includes("rubber") || m.includes("textile") ||
      m.includes("aluminum") || m.includes("aluminium") || m.includes("steel") ||
      m.includes("tin") || m.includes("ceramic") || m.includes("wood")) {
    return "Dry Waste";
  }

  if (m.includes("organic") || m.includes("food") || m.includes("fruit") ||
      m.includes("vegetable") || m.includes("plant") || m.includes("biodegradable") ||
      m.includes("compost")) {
    return "Wet Waste";
  }

  if (m.includes("electronic") || m.includes("chemical") || m.includes("battery") ||
      m.includes("toxic") || m.includes("medical") || m.includes("pharmaceutical") ||
      m.includes("circuit")) {
    return "Hazardous Waste";
  }

  return null;
}

// ================================================================
// SMART CATEGORY GUESS FROM ITEM NAME
// ================================================================
function smartCategoryGuess(itemName) {
  const name = itemName.toLowerCase();

  const wetPatterns = [
    /peel/i, /skin/i, /core/i, /seed/i, /pit/i, /husk/i,
    /\bfood\b/i, /rice/i, /roti/i, /bread/i, /chapati/i, /paratha/i,
    /\bdal\b/i, /sabzi/i, /curry/i, /sambar/i, /dosa/i, /idli/i,
    /banana/i, /apple/i, /orange/i, /mango/i, /grape/i, /papaya/i,
    /potato/i, /tomato/i, /onion/i, /carrot/i, /cabbage/i, /spinach/i,
    /tea\s/i, /coffee/i, /chai/i, /milk/i, /curd/i, /paneer/i,
    /egg/i, /meat/i, /fish/i, /chicken/i, /mutton/i, /prawn/i,
    /flower/i, /\bleaf\b/i, /leaves/i, /grass/i, /garden/i,
    /leftover/i, /scrap/i, /kitchen/i, /cooked/i, /raw\s/i,
    /coconut\sshell/i, /sugarcane/i, /corn\scob/i, /watermelon/i,
    /cake/i, /noodle/i, /pasta/i, /soup/i, /gravy/i, /stale/i,
    /rotten/i, /spoiled/i, /expired\sfood/i, /vegetable\speel/i,
    /fruit\speel/i, /fruit\score/i, /fruit\swaste/i,
  ];

  const hazPatterns = [
    /batter/i, /\bcell\b/i, /\bphone\b/i, /mobile/i, /charger/i, /cable/i,
    /\bbulb\b/i, /\bcfl\b/i, /tube\slight/i, /\bled\sbulb/i, /fluorescent/i,
    /medicine/i, /tablet/i, /capsule/i, /syringe/i, /needle/i, /\bpill\b/i,
    /paint/i, /thinner/i, /chemical/i, /\bacid\b/i, /bleach/i,
    /pesticide/i, /insecticide/i, /poison/i, /toxic/i,
    /nail\spolish/i, /hair\sdye/i, /aerosol/i, /spray\scan/i,
    /thermometer/i, /mercury/i, /cartridge/i, /toner/i,
    /motor\soil/i, /brake/i, /coolant/i,
    /electronic/i, /circuit/i, /keyboard/i, /\bmouse\b/i, /laptop/i,
    /earphone/i, /headphone/i, /\busb\b/i, /e[\s-]?waste/i,
    /cigarette/i, /sanitizer/i, /disinfectant/i,
  ];

  for (const pattern of hazPatterns) {
    if (pattern.test(name)) return "Hazardous Waste";
  }
  for (const pattern of wetPatterns) {
    if (pattern.test(name)) return "Wet Waste";
  }
  return null;
}

// ================================================================
// DEFAULT TIPS
// ================================================================
function getDefaultTip(category, itemName) {
  const tips = {
    "Wet Waste": `Place ${itemName} in the Green Bin for composting. Wet waste decomposes naturally and enriches soil. Keep it separate from dry waste for efficient processing by Ranchi Municipal Corporation.`,
    "Dry Waste": `Clean and dry ${itemName} before placing in the Blue Bin. Sell recyclables to your local kabadiwala for extra income. Proper recycling reduces Ranchi's landfill burden significantly.`,
    "Hazardous Waste": `⚠️ WARNING: ${itemName} contains toxic materials. NEVER throw in regular bins or drains. Take to the nearest e-waste/hazardous waste collection center. Contact Ranchi Municipal Corporation helpline for safe disposal.`,
  };
  return tips[category] || tips["Dry Waste"];
}

// ================================================================
// FALLBACK FROM RAW TEXT
// ================================================================
function buildFallbackFromText(rawText) {
  const text = rawText.toLowerCase();

  const wetKW = ["food","fruit","vegetable","peel","organic","compost","biodegradable","kitchen","leftover","tea","coffee","egg","flower","leaf","garden","banana","apple","orange","potato","onion","bread","rice","roti","dal","curry","milk","curd","paneer","coconut","mango","tomato","meat","fish","chicken","chapati","dosa","idli","sambar"];
  const dryKW = ["plastic","paper","cardboard","glass","metal","can","bottle","newspaper","magazine","cloth","rubber","toy","shoe","book","packaging","wrapper","foil","thermocol","styrofoam","tetra","carton","bag","container","box","pen","straw","cup","plate"];
  const hazKW = ["battery","chemical","medicine","syringe","bulb","tube light","paint","pesticide","electronic","e-waste","phone","charger","cartridge","nail polish","aerosol","thermometer","bleach","acid","motor oil","insecticide","tablet","capsule","cigarette","mercury","toner","sanitizer"];

  let category = "Dry Waste";
  let itemName = "Unidentified Waste";

  for (const kw of hazKW) {
    if (text.includes(kw)) {
      category = "Hazardous Waste";
      itemName = kw.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      break;
    }
  }
  if (category === "Dry Waste") {
    for (const kw of wetKW) {
      if (text.includes(kw)) {
        category = "Wet Waste";
        itemName = kw.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        break;
      }
    }
  }
  if (category === "Dry Waste" && itemName === "Unidentified Waste") {
    for (const kw of dryKW) {
      if (text.includes(kw)) {
        itemName = kw.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        break;
      }
    }
  }

  return normalizeResult({
    name: itemName,
    category: category,
    recyclable: category === "Dry Waste",
    biodegradable: category === "Wet Waste",
    hazardous: category === "Hazardous Waste",
    tip: getDefaultTip(category, itemName),
    confidence: "Low",
  });
}

// ================================================================
// EXPORTS
// ================================================================
export function isAPIConfigured() {
  return GEMINI_API_KEY && GEMINI_API_KEY !== "AIzaSyCuad4e_2NG_c9A_45VGIoooNs7ghaSQ7Q" && GEMINI_API_KEY.length > 10;
}