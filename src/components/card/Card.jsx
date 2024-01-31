import { useNavigate } from 'react-router-dom';
import { CCol, CLink, CWidgetStatsF } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowRight } from '@coreui/icons';

const Card = ({ icon, title, description, to, customClass }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <CCol xs={12} sm={6} lg={3} className='mb-3'>
      <CWidgetStatsF
        color="secondary"
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color:'#FEBE98' }}
        onClick={handleClick}
        footer={
          <CLink
            className="font-weight-bold font-xs text-medium-emphasis d-block"
            href={to}
            target="_self"
          >
            Ver mais
            <CIcon icon={cilArrowRight} className="float-end" width={16} />
          </CLink>
        }
        icon={<CIcon icon={icon} height={24} />}
        title={title}
        value={description}
      />
    </CCol>
  );
};

export default Card;
