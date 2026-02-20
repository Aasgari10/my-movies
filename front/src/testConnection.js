  // frontend/src/testConnection.js
  export const testBackendConnection = async () => {
    console.log('🔍 تست اتصال به بک‌اند...')
    
    try {
      // تست ۱: مستقیم به بک‌اند
      const directTest = await fetch('http://localhost:3001/api/health')
      console.log('✅ تست مستقیم:', await directTest.json())
      
      // تست ۲: از طریق proxy
      const proxyTest = await fetch('/api/health')
      console.log('✅ تست از طریق proxy:', await proxyTest.json())
      
      return true
    } catch (error) {
      console.error('❌ تست اتصال شکست خورد:', error.message)
      
      // راهنمای عیب‌یابی
      console.log('\n🔧 راهنمای عیب‌یابی:')
      console.log('1. آیا بک‌اند اجراست؟ (npm run dev در پوشه backend)')
      console.log('2. آیا پورت 3001 آزاد است؟')
      console.log('3. VPN را امتحان کنید (خاموش/روشن)')
      console.log('4. فایروال را بررسی کنید')
      
      return false
    }
  }