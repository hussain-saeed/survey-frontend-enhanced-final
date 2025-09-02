import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { FaBars } from 'react-icons/fa';
import { toast } from 'react-toastify';
import dashboardBg from '../../assets/dashboardBg.png';

const EditSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [minDurationMinutes, setMinDurationMinutes] = useState('');
  const [maxDurationMinutes, setMaxDurationMinutes] = useState('');
  const [requiredSubmissions, setRequiredSubmissions] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [otherUniversity, setOtherUniversity] = useState('');
  const [universities, setUniversities] = useState([]);
  const [reason, setReason] = useState('');
  const [langChoice, setLangChoice] = useState('en');
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const userLang = localStorage.getItem('language') || 'en';
    setLanguage(userLang);
    setIsRTL(userLang === 'ar');

    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8000/researcher/surveys/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const survey = response.data;
        setName(survey.title);
        setDescription(survey.description);
        setDurationDays(survey.duration_days);
        setMinDurationMinutes(survey.min_duration_minutes);
        setMaxDurationMinutes(survey.max_duration_minutes);
        setRequiredSubmissions(survey.required_submissions);
        setSelectedUniversity(survey.university || '');
        setReason(survey.reason || '');
        setLangChoice(survey.language || 'en');
      })
      .catch(() => {
        toast.error(language === 'ar' ? 'فشل تحميل الاستبيان' : 'Failed to load survey');
      });

    axios.get('http://localhost:8000/api/universities/')
      .then((response) => setUniversities(response.data))
      .catch(() => {
        toast.error(language === 'ar' ? 'فشل تحميل الجامعات' : 'Failed to load universities');
      });
  }, [id, navigate]);

  const handleUpdateSurvey = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    try {
      await axios.put(`http://localhost:8000/researcher/surveys/${id}/`, {
        title: name,
        description,
        duration_days: durationDays,
        min_duration_minutes: minDurationMinutes,
        max_duration_minutes: maxDurationMinutes,
        required_submissions: requiredSubmissions,
        university: selectedUniversity === 'other' ? otherUniversity : selectedUniversity,
        reason,
        language: langChoice,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(language === 'ar' ? 'تم تحديث الاستبيان بنجاح' : 'Survey updated successfully');
      navigate('/researcher-dashboard');
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ أثناء التحديث' : 'Error updating survey');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' ,      background: `url(${dashboardBg})`,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',}} dir={isRTL ? 'rtl' : 'ltr'}>
      {showSidebar && <Sidebar />}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          style={{
            position: 'fixed',
            top: '1rem',
            [isRTL ? 'left' : 'right']: '1rem',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            zIndex: 1000,
            cursor: 'pointer',
            color: '#395692'
          }}
        >
          <FaBars />
        </button>
      )}

      <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto', background: `url(${dashboardBg})`,
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%', }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          backgroundColor: '#A3B6DED4',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderTop: '5px solid #395692',
        }}>
            <button
  type="button"
  onClick={() => window.location.href = 'http://localhost:3000/all-surveys'}
  style={{
    backgroundColor: '#395692',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    marginBottom: '1rem',
    cursor: 'pointer'
  }}
>
  {language === 'ar' ? 'العودة إلى الاستبيانات' : 'Back to All Surveys'}
</button>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#395692' }}>
            {language === 'ar' ? 'تعديل الاستبيان' : 'Edit Survey'}
          </h2>

          <form onSubmit={handleUpdateSurvey}>
            {[
              { label: isRTL ? 'اسم الاستبيان' : 'Survey Title', type: 'text', value: name, setter: setName },
              { label: isRTL ? 'الوصف' : 'Description', type: 'textarea', value: description, setter: setDescription },
              { label: isRTL ? 'مدة الاستبيان (أيام)' : 'Survey Deadline (days)', type: 'number', value: durationDays, setter: setDurationDays },
              { label: isRTL ? 'الحد الأدنى لمدة الإجابة (دقائق)' : 'Minimum Duration (minutes)', type: 'number', value: minDurationMinutes, setter: setMinDurationMinutes },
              { label: isRTL ? 'الحد الأقصى لمدة الإجابة (دقائق)' : 'Maximum Duration (minutes)', type: 'number', value: maxDurationMinutes, setter: setMaxDurationMinutes },
              { label: isRTL ? 'عدد المشاركات المطلوبة' : 'Required Number of Submissions', type: 'number', value: requiredSubmissions, setter: setRequiredSubmissions }
            ].map((field, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem',fontSize:'14px',fontFamily:'Poppins',color:'#fff' }}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows="4"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      direction: isRTL ? 'rtl' : 'ltr',
                      background:'#D2DBEC'
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      direction: isRTL ? 'rtl' : 'ltr',
                      background:'#D2DBEC'
                    }}
                  />
                )}
              </div>
            ))}

            {/* University Select */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>{isRTL ? 'الجامعة' : 'University'}</label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  direction: isRTL ? 'rtl' : 'ltr',
                  background:'#D2DBEC'
                }}
              >
                <option value="">{isRTL ? 'اختر الجامعة' : 'Select University'}</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>{uni.name}</option>
                ))}
                <option value="other">{isRTL ? 'أخرى' : 'Other'}</option>
              </select>
              {selectedUniversity === 'other' && (
                <input
                  type="text"
                  placeholder={isRTL ? 'اكتب اسم الجامعة' : 'Enter university name'}
                  value={otherUniversity}
                  onChange={(e) => setOtherUniversity(e.target.value)}
                  required
                  style={{
                    marginTop: '0.5rem',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    direction: isRTL ? 'rtl' : 'ltr',
                    background:'#D2DBEC'

                  }}
                />
              )}
            </div>

            {/* Reason Select */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>{isRTL ? 'سبب الاستبيان' : 'Reason'}</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  direction: isRTL ? 'rtl' : 'ltr',
                  background:'#D2DBEC'

                }}
              >
                <option value="">{isRTL ? 'اختر السبب' : 'Select Reason'}</option>
                <option value="bachelor">{isRTL ? 'بكالوريوس' : 'Bachelor'}</option>
                <option value="masters">{isRTL ? 'ماجستير' : 'Master’s'}</option>
                <option value="phd">{isRTL ? 'دكتوراه' : 'PhD'}</option>
                <option value="research">{isRTL ? 'ورقة بحثية' : 'Research Paper'}</option>
                <option value="market">{isRTL ? 'بحث سوقي' : 'Market Research'}</option>
              </select>
            </div>

            {/* Language Select */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: 'bold' }}>{isRTL ? 'لغة الاستبيان' : 'Survey Language'}</label>
              <select
                value={langChoice}
                onChange={(e) => setLangChoice(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  direction: isRTL ? 'rtl' : 'ltr',
                  background:'#D2DBEC'

                }}
              >
                <option value="en">{isRTL ? 'الإنجليزية' : 'English'}</option>
                <option value="ar">{isRTL ? 'العربية' : 'Arabic'}</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <button
                type="submit"
                style={{
                backgroundColor: '#F19303',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                flex: 1
                }}
            >
                {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </button>

            <button
                type="button"
                onClick={() => navigate(`/edit-survey-demographics/${id}`)}
                style={{
                backgroundColor: '#395692',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                flex: 1
                }}
            >
                {language === 'ar' ? 'تحديث الأسئلة' : 'Update Demographics'}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSurvey;
