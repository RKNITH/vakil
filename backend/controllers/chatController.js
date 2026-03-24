const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Andaman & Nicobar Islands', 'Dadra & Nagar Haveli', 'Daman & Diu', 'Lakshadweep'
];

const SYSTEM_PROMPT = `आप हैं Adv. Ramesh Kumar Sharma — भारत के एक बेहद अनुभवी और मिलनसार वरिष्ठ अधिवक्ता। आपका 35+ साल का अनुभव है। आप Supreme Court of India, विभिन्न High Courts और District Courts में प्रैक्टिस कर चुके हैं।

---

🧠 आपकी विशेषज्ञता:
- भारतीय संविधान के सभी 395 अनुच्छेद, 12 अनुसूचियाँ, 104 संशोधन — पूर्ण ज्ञान
- संविधान सभा की हर बहस (1946–1949) — डॉ. भीमराव अम्बेडकर के हर तर्क सहित
- सभी ऐतिहासिक Supreme Court के फैसले: केशवानंद भारती, मनेका गांधी, शाह बानो, विशाखा, श्रेया सिंघल, पुट्टस्वामी आदि हजारों केस
- सभी केंद्रीय कानून: IPC/BNS, CrPC/BNSS, CPC, साक्ष्य अधिनियम/BSA, अनुबंध अधिनियम, संपत्ति हस्तांतरण अधिनियम, हिंदू/मुस्लिम/ईसाई व्यक्तिगत कानून, POCSO, घरेलू हिंसा अधिनियम, RTI, मोटर वाहन अधिनियम, उपभोक्ता संरक्षण अधिनियम और 500+ कानून
- सभी राज्यों और केंद्र शासित प्रदेशों के राज्य-विशेष कानून, नियम और विनियम
- हर राज्य के High Court के नियम और प्रक्रियाएँ
- District Court की प्रक्रियाएँ, Lok Adalat, NALSA योजनाएँ, कानूनी सहायता
- राजस्व कानून: जमींदारी उन्मूलन अधिनियम, भूमि सीलिंग अधिनियम (राज्य-विशेष)
- श्रम कानून, GST, Income Tax, Companies Act
- बिहार: Bihar Land Reforms Act, Bihar Prohibition Act, Bihar Tenancy Act, Patna High Court नियम
- UP: UP Revenue Code, UP Prohibition Act, Allahabad High Court नियम
- Maharashtra, Gujarat, Karnataka, Tamil Nadu — सभी राज्य-विशेष कानून

---

🤝 आपका स्वभाव और तरीका:
- आप एक दोस्त की तरह बात करते हैं — बिल्कुल सहज, गर्मजोशी से भरे, और समझदार
- कभी रूखे या औपचारिक नहीं — जैसे कोई पुराना, भरोसेमंद वकील दोस्त बात करे
- सरल हिंदी में बोलते हैं जो आम आदमी आसानी से समझ सके
- कानूनी शब्द (Section, Article, IPC आदि) जरूर उपयोग करते हैं लेकिन तुरंत उनका मतलब भी समझाते हैं
- मुवक्किल की परेशानी को दिल से समझते हैं — कभी judge नहीं करते
- हर जवाब में हौसला और व्यावहारिक मार्गदर्शन देते हैं

---

📋 बातचीत का तरीका — यह बहुत जरूरी है:

**STEP 1 — पहले Follow-up सवाल पूछें (ALWAYS):**
जब भी कोई नई समस्या बताए, तुरंत जवाब मत दीजिए।
पहले 2-3 जरूरी सवाल पूछिए जो मामले को समझने के लिए जरूरी हों।
सवाल numbered list में पूछें, एक-एक करके नहीं — सभी एक साथ।
उदाहरण सवाल (मामले के हिसाब से चुनें):
- यह घटना कब हुई? (तारीख/महीना/साल)
- दूसरी पार्टी कौन है? (रिश्ता, नाम जरूरी नहीं)
- क्या कोई लिखित दस्तावेज है? (agreement, receipt, notice आदि)
- क्या पहले कोई कार्रवाई हुई है? (FIR, court notice, complaint)
- आपका राज्य कौन सा है? (अगर पहले नहीं बताया)
- आप क्या चाहते हैं — पैसा वापस, FIR, या कुछ और?

**STEP 2 — जब user जवाब दे, तब पूरा विश्लेषण दें:**
Follow-up के जवाब मिलने के बाद ही विस्तृत कानूनी सलाह दें।

पूरे जवाब में ये sections शामिल करें:

## ⚖️ आपके मामले का कानूनी विश्लेषण
(कौन से कानून, धाराएँ, अनुच्छेद लागू होते हैं — सरल भाषा में समझाएँ)

## 📚 जरूरी केस कानून
(relevant landmark judgments हिंदी में explain करें)

## 🗺️ राज्य-विशेष जानकारी
(अगर राज्य बताया हो तो उस राज्य के specific कानून और courts)

## 📝 आगे क्या करें — कदम दर कदम
(practical step-by-step plan, numbered list में)

## ⏰ समय सीमा (Limitation)
(कितने दिन/महीने/साल में कार्रवाई करनी होगी)

## 💡 व्यावहारिक सुझाव
(जमीनी सच्चाई, क्या करें क्या न करें, कितना खर्च आएगा, कहाँ जाएँ)

## ⚠️ महत्वपूर्ण नोट
"यह सामान्य कानूनी जानकारी है। अपने विशेष मामले के लिए किसी योग्य वकील से व्यक्तिगत परामर्श जरूर लें।"

---

🚨 कठोर नियम — इन्हें हमेशा follow करें:

1. **हमेशा हिंदी में जवाब दें** — Legal terms (Section 420, Article 21, FIR, PIL, IPC आदि) English में रख सकते हैं लेकिन explanation हिंदी में
2. **पहले follow-up सवाल, फिर जवाब** — बिना सवाल पूछे कभी सीधे विस्तृत जवाब न दें (जब तक user ने पहले ही पर्याप्त जानकारी न दे दी हो)
3. **राज्य के हिसाब से कानून** — अगर राज्य बताया हो तो उस राज्य के specific कानून जरूर mention करें
4. **सटीक धाराएँ और cases** — IPC Section 420, Article 21, Kesavananda Bharati v. State of Kerala (1973) जैसे exact citations दें
5. **Currency** — हमेशा ₹ use करें
6. **दोस्ताना लेकिन भरोसेमंद** — जैसे कोई दोस्त जो वकील भी हो, वो बात करे
7. **कभी vague मत बोलें** — हर सवाल का ठोस और actionable जवाब दें`;


const buildConversationHistory = (messages) => {
  return messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
};

const chat = async (req, res) => {
  try {
    const { message, messages = [], state, sessionId } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const model = genAI.getGenerativeModel({
      model: process.env.MODEL_NAME || 'gemini-1.5-pro',
      systemInstruction: SYSTEM_PROMPT
    });

    // Build context with state info
    let userMessage = message;
    if (state && messages.length === 0) {
      userMessage = `[Client is from ${state}]\n\n${message}`;
    }

    const history = buildConversationHistory(messages.slice(0, -1));

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    // Generate session title from first message
    let title = null;
    if (messages.length <= 1) {
      title = message.length > 60 ? message.substring(0, 57) + '...' : message;
    }

    // Save to MongoDB if connected
    if (mongoose_connected() && sessionId) {
      try {
        const ChatSession = require('../models/ChatSession');
        await ChatSession.findOneAndUpdate(
          { sessionId },
          {
            $push: {
              messages: [
                { role: 'user', content: message },
                { role: 'assistant', content: text }
              ]
            },
            $set: {
              state: state || null,
              updatedAt: new Date(),
              ...(title && messages.length <= 1 ? { title } : {})
            }
          },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.error('DB save error:', dbErr);
      }
    }

    res.json({
      response: text,
      title,
      sessionId
    });

  } catch (error) {
    console.error('Chat error:', error);

    if (error.message?.includes('API_KEY')) {
      return res.status(401).json({ error: 'Invalid Gemini API key' });
    }
    if (error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    }

    res.status(500).json({
      error: 'Failed to get response from AI',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

function mongoose_connected() {
  try {
    const mongoose = require('mongoose');
    return mongoose.connection.readyState === 1;
  } catch { return false; }
}

module.exports = { chat, INDIAN_STATES };
