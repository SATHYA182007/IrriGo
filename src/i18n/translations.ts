import { Language } from '../types';

export interface Translations {
  // Common Navigation
  navHome: string;
  navHowItWorks: string;
  navImpact: string;
  navForFarmers: string;
  navAbout: string;
  navSimulator: string;
  navSignIn: string;
  navSignUp: string;
  navGetStarted: string;
  navDashboard: string;
  navWater: string;
  navEnergy: string;
  navCropHealth: string;
  navClimate: string;
  navPostHarvest: string;
  navAssistant: string;
  navNotifications: string;
  navProfile: string;
  navAdmin: string;
  navAnalytics: string;
  navDevices: string;
  navAlerts: string;

  // Hero & Landing
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroGreeting: string;
  heroFarmStatus: string;
  heroWaterStatus: string;
  heroSolarStatus: string;
  heroCropStatus: string;
  heroAiRecTitle: string;
  heroAiRecText: string;
  heroViewRec: string;

  // UX & Farmer Dashboard
  farmerGreeting: string;
  farmerSubGreeting: string;
  whatToDoToday: string;
  waterStatusLabel: string;
  energyStatusLabel: string;
  cropStatusLabel: string;
  weatherStatusLabel: string;
  aiRecHeader: string;
  startIrrigation: string;
  viewDetails: string;
  whyThisRec: string;
  irrigateYes: string;
  irrigateNo: string;
  shouldIIrrigate: string;
  recTime: string;
  recDuration: string;
  recWaterAmount: string;
  recEnergySource: string;

  // Solar & Energy
  solarWindowNotice: string;
  solarHighNotice: string;
  energyFlowTitle: string;
  solarPower: string;
  batteryLevel: string;
  pumpConsumption: string;
  gridPower: string;

  // Crop & Climate
  scanCropButton: string;
  scanCropNotice: string;
  disclaimerNote: string;
  heatRisk: string;
  rainRisk: string;
  drySpellRisk: string;

  // Simulator
  simulatorTitle: string;
  simulatorSubtitle: string;
  soilMoisture: string;
  temperature: string;
  rainProbability: string;
  solarAvailability: string;
  waterTankLevel: string;
  growthStage: string;
  runAgriPulse: string;

  // System State
  offlineMode: string;
  lastSynced: string;
  syncNow: string;
  demoModeLabel: string;
  exitDemo: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    navHome: "Home",
    navHowItWorks: "How It Works",
    navImpact: "Impact",
    navForFarmers: "For Farmers",
    navAbout: "About",
    navSimulator: "Farm Simulator",
    navSignIn: "Sign In",
    navSignUp: "Sign Up",
    navGetStarted: "Get Started",
    navDashboard: "Dashboard",
    navWater: "Water Intelligence",
    navEnergy: "Smart Energy",
    navCropHealth: "Crop Health",
    navClimate: "Climate Shield",
    navPostHarvest: "AgriVault Storage",
    navAssistant: "Ask AgriPulse",
    navNotifications: "Alerts & Messages",
    navProfile: "Profile & Settings",
    navAdmin: "Admin Overview",
    navAnalytics: "Analytics",
    navDevices: "Devices & IoT",
    navAlerts: "Network Alerts",

    heroTitle: "Smarter Farming. Less Water. Cleaner Energy.",
    heroSubtitle: "AgriPulse AI helps smallholder farmers make better decisions using soil, weather, crop and energy intelligence.",
    heroCtaPrimary: "Get Started Free",
    heroCtaSecondary: "See How It Works",
    heroGreeting: "Good morning",
    heroFarmStatus: "Your farm is healthy.",
    heroWaterStatus: "Water Level",
    heroSolarStatus: "Solar Energy",
    heroCropStatus: "Crop Health",
    heroAiRecTitle: "AI Recommendation",
    heroAiRecText: "Irrigate tomorrow at 10:30 AM for 35 minutes using solar power.",
    heroViewRec: "View Recommendation",

    farmerGreeting: "Good morning, Ravi",
    farmerSubGreeting: "Your farm is looking healthy and well-balanced today.",
    whatToDoToday: "What should I do today?",
    waterStatusLabel: "Water Condition",
    energyStatusLabel: "Solar Availability",
    cropStatusLabel: "Crop Health",
    weatherStatusLabel: "Weather Forecast",
    aiRecHeader: "Today's Action Recommendation",
    startIrrigation: "Start Irrigation Now",
    viewDetails: "View Details & Reasons",
    whyThisRec: "Why is AgriPulse recommending this?",
    irrigateYes: "YES — Irrigate Tomorrow",
    irrigateNo: "NO — Hold Irrigation",
    shouldIIrrigate: "Should I irrigate today?",
    recTime: "Recommended Time",
    recDuration: "Est. Duration",
    recWaterAmount: "Est. Water Needed",
    recEnergySource: "Energy Source",

    solarWindowNotice: "Solar energy is peak between 10:00 AM and 12:00 PM. Schedule irrigation in this window.",
    solarHighNotice: "High solar availability detected. Free clean energy available for pumping.",
    energyFlowTitle: "Smart Farm Energy Flow",
    solarPower: "Solar Panels",
    batteryLevel: "Battery Storage",
    pumpConsumption: "Water Pump",
    gridPower: "Grid / Diesel",

    scanCropButton: "Scan Crop Photo",
    scanCropNotice: "Possible water stress detected in Field A. Inspect drip irrigation line.",
    disclaimerNote: "Prototype AI analysis — not an official agricultural diagnosis.",
    heatRisk: "Heat Stress Risk",
    rainRisk: "Expected Rain Risk",
    drySpellRisk: "Dry Spell Duration",

    simulatorTitle: "Interactive Farm Simulator",
    simulatorSubtitle: "Adjust soil, weather, and solar conditions to test how AgriPulse AI makes smart irrigation decisions.",
    soilMoisture: "Soil Moisture",
    temperature: "Temperature",
    rainProbability: "Rainfall Probability",
    solarAvailability: "Solar Availability",
    waterTankLevel: "Water Tank Capacity",
    growthStage: "Crop Stage",
    runAgriPulse: "Run AgriPulse Engine",

    offlineMode: "Offline Mode",
    lastSynced: "Last synced 12 minutes ago",
    syncNow: "Sync Now",
    demoModeLabel: "Demo Mode Active (Ravi Kumar — 2.4 Acres, Tomato, Tamil Nadu)",
    exitDemo: "Reset Demo",
  },
  ta: {
    navHome: "முகப்பு",
    navHowItWorks: "செயல்படும் முறை",
    navImpact: "தாக்கம்",
    navForFarmers: "விவசாயிகளுக்கு",
    navAbout: "எங்களைப் பற்றி",
    navSimulator: "பண்ணை உருவகப்படுத்துதல்",
    navSignIn: "உள்நுழை",
    navSignUp: "பதிவு செய்",
    navGetStarted: "தொடங்கவும்",
    navDashboard: "டாஷ்போர்டு",
    navWater: "நீர் மேலாண்மை",
    navEnergy: "சூரிய சக்தி",
    navCropHealth: "பயிர் ஆரோக்கியம்",
    navClimate: "காலநிலை பாதுகாப்பு",
    navPostHarvest: "அறுவடை சேமிப்பு",
    navAssistant: "அக்ரிபல்ஸ் உதவி",
    navNotifications: "அறிவிப்புகள்",
    navProfile: "சுயவிவர அமைப்புகள்",
    navAdmin: "நிர்வாகி பார்வை",
    navAnalytics: "பகுப்பாய்வு",
    navDevices: "கருவிகள்",
    navAlerts: "எச்சரிக்கைகள்",

    heroTitle: "புத்திசாலி விவசாயம். குறைந்த நீர். தூய்மையான ஆற்றல்.",
    heroSubtitle: "மண், வானிலை, பயிர் மற்றும் சூரிய சக்தி தகவல்களைக் கொண்டு சிறு விவசாயிகளுக்கு எளிய முடிவுகளை அக்ரிபல்ஸ் AI வழங்குகிறது.",
    heroCtaPrimary: "இலவசமாக தொடங்குக",
    heroCtaSecondary: "எப்படி செயல்படுகிறது எனப் பார்",
    heroGreeting: "காலை வணக்கம்",
    heroFarmStatus: "உங்கள் பண்ணை ஆரோக்கியமாக உள்ளது.",
    heroWaterStatus: "நீர் அளவு",
    heroSolarStatus: "சூரிய சக்தி",
    heroCropStatus: "பயிர் நிலை",
    heroAiRecTitle: "AI பரிந்துரை",
    heroAiRecText: "நாளை காலை 10:30 மணிக்கு 35 நிமிடங்கள் சூரிய சக்தியில் நீர் பாய்ச்சவும்.",
    heroViewRec: "பரிந்துரையைப் பார்",

    farmerGreeting: "காலை வணக்கம், ரவி",
    farmerSubGreeting: "இன்று உங்கள் பண்ணை நல்ல ஆரோக்கியத்துடன் காணப்படுகிறது.",
    whatToDoToday: "இன்று நான் என்ன செய்ய வேண்டும்?",
    waterStatusLabel: "நீர் நிலை",
    energyStatusLabel: "சூரிய ஒளி நிலை",
    cropStatusLabel: "பயிர் ஆரோக்கியம்",
    weatherStatusLabel: "வானிலை அறிக்கை",
    aiRecHeader: "இன்றைய முக்கிய நடவடிக்கை",
    startIrrigation: "இப்போதே நீர் பாய்ச்சு",
    viewDetails: "விவரங்களை பார்",
    whyThisRec: "அக்ரிபல்ஸ் இதை ஏன் பரிந்துரைக்கிறது?",
    irrigateYes: "ஆம் — நாளை நீர் பாய்ச்சவும்",
    irrigateNo: "இல்லை — நீர் பாய்ச்ச வேண்டாம்",
    shouldIIrrigate: "இன்று நான் நீர் பாய்ச்ச வேண்டுமா?",
    recTime: "பரிந்துரைக்கப்பட்ட நேரம்",
    recDuration: "தேவையான நேரம்",
    recWaterAmount: "தேவையான நீர் அளவு",
    recEnergySource: "ஆற்றல் மூலம்",

    solarWindowNotice: "காலை 10:00 முதல் மதியம் 12:00 வரை சூரிய ஒளி அதிகம். இந்த நேரத்தில் நீர் பாய்ச்சவும்.",
    solarHighNotice: "அதிக சூரிய ஒளி உள்ளது. இலவச தூய்மையான ஆற்றலைப் பயன்படுத்தலாம்.",
    energyFlowTitle: "பண்ணை ஆற்றல் ஓட்டம்",
    solarPower: "சூரிய மின்தகடு",
    batteryLevel: "பேட்டரி அளவு",
    pumpConsumption: "நீர் பம்ப்",
    gridPower: "மின்சாரம் / டீசல்",

    scanCropButton: "பயிரைப் படம் பிடி",
    scanCropNotice: "புலம் A-இல் நீர் பற்றாக்குறை இருக்க வாய்ப்புள்ளது. சொட்டுநீர் குழாயைச் சரிபார்க்கவும்.",
    disclaimerNote: "மாதிரி AI பகுப்பாய்வு — இது அதிகாரப்பூர்வ விவசாய நோய் கண்டறிதல் அல்ல.",
    heatRisk: "வெப்ப அபாயம்",
    rainRisk: "மழை வாய்ப்பு",
    drySpellRisk: "வறட்சி காலம்",

    simulatorTitle: "பண்ணை உருவகப்படுத்துதல்",
    simulatorSubtitle: "மண், வானிலை மற்றும் சூரிய ஒளியை மாற்றி அக்ரிபல்ஸ் AI எவ்வாறு நீர் பாய்ச்சல் முடிவுகளை எடுக்கிறது என சோதிக்கவும்.",
    soilMoisture: "மண் ஈரம்",
    temperature: "வெப்பநிலை",
    rainProbability: "மழை வாய்ப்பு",
    solarAvailability: "சூரிய ஒளி நிலை",
    waterTankLevel: "தொட்டி நீர் அளவு",
    growthStage: "பயிர் நிலை",
    runAgriPulse: "அக்ரிபல்ஸ் இயக்குக",

    offlineMode: "ஆஃப்லைன் பயன்முறை",
    lastSynced: "கடைசியாக 12 நிமிடங்களுக்கு முன் புதுப்பிக்கப்பட்டது",
    syncNow: "இப்போது புதுப்பி",
    demoModeLabel: "டெமோ முறை இயங்குகிறது (ரவி குமார் — 2.4 ஏக்கர், தக்காளி, தமிழ்நாடு)",
    exitDemo: "டெமோ மீட்டமை",
  },
  hi: {
    navHome: "मुख्य पृष्ठ",
    navHowItWorks: "यह कैसे काम करता है",
    navImpact: "प्रभाव",
    navForFarmers: "किसानों के लिए",
    navAbout: "हमारे बारे में",
    navSimulator: "फार्म सिमुलेटर",
    navSignIn: "साइन इन करें",
    navSignUp: "साइन अप करें",
    navGetStarted: "शुरू करें",
    navDashboard: "डैशबोर्ड",
    navWater: "जल प्रबंधन",
    navEnergy: "सौर ऊर्जा",
    navCropHealth: "फसल स्वास्थ्य",
    navClimate: "मौसम सुरक्षा",
    navPostHarvest: "फसल कटाई के बाद",
    navAssistant: "एग्रीपल्स सहायक",
    navNotifications: "सूचनाएं",
    navProfile: "प्रोफ़ाइल सेटिंग्स",
    navAdmin: "एडमिन अवलोकन",
    navAnalytics: "विश्लेषण",
    navDevices: "उपकरण (IoT)",
    navAlerts: "नेटवर्क अलर्ट",

    heroTitle: "स्मार्ट खेती। कम पानी। स्वच्छ ऊर्जा।",
    heroSubtitle: "एग्रीपल्स AI मिट्टी, मौसम, फसल और सौर ऊर्जा की जानकारी से छोटे किसानों को सरल सलाह देता है।",
    heroCtaPrimary: "मुफ्त में शुरू करें",
    heroCtaSecondary: "कार्यप्रणाली देखें",
    heroGreeting: "शुभ प्रभात",
    heroFarmStatus: "आपका खेत स्वस्थ है।",
    heroWaterStatus: "जल स्तर",
    heroSolarStatus: "सौर ऊर्जा",
    heroCropStatus: "फसल स्थिति",
    heroAiRecTitle: "AI सलाह",
    heroAiRecText: "कल सुबह 10:30 बजे 35 मिनट के लिए सौर ऊर्जा से सिंचाई करें।",
    heroViewRec: "सलाह देखें",

    farmerGreeting: "शुभ प्रभात, रवि",
    farmerSubGreeting: "आज आपका खेत स्वस्थ और संतुलित दिख रहा है।",
    whatToDoToday: "मुझे आज क्या करना चाहिए?",
    waterStatusLabel: "जल स्थिति",
    energyStatusLabel: "सौर ऊर्जा उपलब्धता",
    cropStatusLabel: "फसल स्वास्थ्य",
    weatherStatusLabel: "मौसम का पूर्वानुमान",
    aiRecHeader: "आज की मुख्य सलाह",
    startIrrigation: "अभी सिंचाई शुरू करें",
    viewDetails: "कारण एवं विवरण देखें",
    whyThisRec: "एग्रीपल्स यह सलाह क्यों दे रहा है?",
    irrigateYes: "हां — कल सिंचाई करें",
    irrigateNo: "नहीं — सिंचाई रोकें",
    shouldIIrrigate: "क्या मुझे आज सिंचाई करनी चाहिए?",
    recTime: "अनुशंसित समय",
    recDuration: "अनुमानित समय",
    recWaterAmount: "आवश्यक जल",
    recEnergySource: "ऊर्जा स्रोत",

    solarWindowNotice: "सुबह 10:00 से दोपहर 12:00 बजे के बीच धूप सबसे अच्छी है। इसी समय सिंचाई तय करें।",
    solarHighNotice: "उत्कृष्ट सौर ऊर्जा उपलब्ध है। मुफ्त स्वच्छ ऊर्जा का उपयोग करें।",
    energyFlowTitle: "खेत ऊर्जा प्रवाह",
    solarPower: "सोलर पैनल",
    batteryLevel: "बैटरी स्तर",
    pumpConsumption: "वाटर पंप",
    gridPower: "बिजली / डीजल",

    scanCropButton: "फसल की फोटो स्कैन करें",
    scanCropNotice: "खेत A में पानी की कमी की संभावना। ड्रिप सिंचाई लाइन की जांच करें।",
    disclaimerNote: "प्रारूप AI विश्लेषण — आधिकारिक कृषि निदान नहीं।",
    heatRisk: "गर्मी का जोखिम",
    rainRisk: "बारिश का जोखिम",
    drySpellRisk: "सूखे का दौर",

    simulatorTitle: "इंटरैक्टिव फार्म सिमुलेटर",
    simulatorSubtitle: "मिट्टी, मौसम और सौर परिस्थितियों को बदलकर देखें कि एग्रीपल्स AI कैसे निर्णय लेता है।",
    soilMoisture: "मिट्टी की नमी",
    temperature: "तापमान",
    rainProbability: "बारिश की संभावना",
    solarAvailability: "सौर ऊर्जा उपलब्धता",
    waterTankLevel: "टंकी में जल स्तर",
    growthStage: "फसल चरण",
    runAgriPulse: "एग्रीपल्स चलाएं",

    offlineMode: "ऑफलाइन मोड",
    lastSynced: "12 मिनट पहले सिंक किया गया",
    syncNow: "अभी सिंक करें",
    demoModeLabel: "डेमो मोड चालू (रवि कुमार — 2.4 एकड़, टमाटर, तमिलनाडु)",
    exitDemo: "डेमो रीसेट करें",
  }
};
