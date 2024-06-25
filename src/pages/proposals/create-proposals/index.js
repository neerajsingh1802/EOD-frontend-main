import React, { useState } from 'react';
import "./create-proposal.css"
import { Box, Modal, Typography, FormControlLabel, Fade, Backdrop, RadioGroup, Radio } from "@mui/material"
import Topbar from '../../../components/common/Topbar';
import { toast } from 'react-toastify';
import ReviewTab from './components/ReviewTab';
import VendorSelection from './components/VendorSelection';
import CreateForm from './components/CreateForm';
import { REQUIRED_VALIDATOR, Validate } from '../../../helpers/utils/validator';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from 'components/common/Button';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "20px",
  p: 6,
};


const finalComponent = ({ handleChange }) => {
  return <div>Final Component</div>
}

const CreateProposals = () => {
  const timeLineStatus = [
    { id: 1, label: "Submitted for Approval" },
    { id: 2, label: "Pending for Approval" },
    { id: 3, label: "Approved/Rejected" },
  ];
  const [steps, setSteps] = useState([
    { key: 'firstStep', label: 'Proposal Details', isDone: true, component: CreateForm, btnLabel: "Submit" },
    { key: 'secondStep', label: 'Review Details', isDone: false, component: ReviewTab, btnLabel: "Submit Approval" },
    { key: 'thirdStep', label: 'Pending For Approval', isDone: false, component: ReviewTab, btnLabel: false },
    { key: 'fourthStep', label: 'Partner Selection', isDone: false, component: VendorSelection, btnLabel: "Confirm Partners" },
    { key: 'fifthStep', label: 'Open For Bidding', isDone: false, component: finalComponent, btnLabel: false },
    { key: 'finalStep', label: 'Bidding Closed', isDone: false, component: finalComponent, btnLabel: false },

  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [form, setForm] = useState({ currency: "INR (₹)" });
  const [saveForm, setSaveForm] = useState(false)
  const [formError, setFormError] = useState({})
  const [favouriteListView, setFavouriteListView] = useState("grid");
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedVendors, setSelectedVendors] = useState([])
  const [discardSelectedVendor, setDiscardSelectedVendor] = useState([])
  const [filteredVendorList, setFilteredVendorList] = useState(null);
  const [finalSelectedPartner, setFinalSelectedPartner] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })

  }
  const handleClose = (val) => {
    setSelectedOption(val)
    setOpen(false)
  };

  const handleEdit = () => {
    setIsEditMode(true)
    setSaveForm(false)

  }

  const handleSaveForm = () => {
    const { title, category, subCategory, description, currency, budgetRangeFrom, budgetRangeTo, country, state, location } = form;
    const titleErr = Validate(REQUIRED_VALIDATOR, title);
    const categoryErr = Validate(REQUIRED_VALIDATOR, category);
    const subCategoryErr = Validate(REQUIRED_VALIDATOR, subCategory);
    const descriptionErr = Validate(REQUIRED_VALIDATOR, description);
    const currencyErr = Validate(REQUIRED_VALIDATOR, currency);
    const budgetRangeFromErr = Validate(REQUIRED_VALIDATOR, budgetRangeFrom);
    const budgetRangeToErr = Validate(REQUIRED_VALIDATOR, budgetRangeTo);
    const countryErr = Validate(REQUIRED_VALIDATOR, country);
    const stateErr = Validate(REQUIRED_VALIDATOR, state);
    const locationErr = Validate(REQUIRED_VALIDATOR, location)

    if (titleErr || categoryErr || subCategoryErr || descriptionErr || currencyErr || budgetRangeFromErr || budgetRangeToErr || countryErr || stateErr) {
      const error = {
        title: titleErr,
        category: categoryErr,
        subCategory: subCategoryErr,
        description: descriptionErr,
        currency: currencyErr,
        budgetRangeFrom: budgetRangeFromErr,
        budgetRangeTo: budgetRangeToErr,
        country: countryErr,
        state: stateErr,
        location: locationErr
      };
      setFormError({ ...error });
      return;
    } else {
      toast.success("Your Proposal Details Saved successfully");
      setSaveForm(true)
    }
  }

  const handleNext = () => {
    const index = steps.findIndex(x => x.key === activeStep.key);
    setSteps(prevStep => prevStep.map(x => {
      if (x.key === activeStep.key) x.isDone = true;
      return x;
    }))
    setActiveStep(steps[index + 1]);
  }

  const handleHeaderBtnClick = () => {
    if (activeStep.key === "firstStep" || activeStep.key === "thirdStep") {
      handleNext()
      return;
    }
    if (activeStep.key === "secondStep") {
      toast.success("Your Application is Submitted for Approval")
      handleNext()
      return;
    }
  }

  const handleBack = () => {
    const index = steps.findIndex(x => x.key === activeStep.key);
    if (index === 0) return;

    setSteps(prevStep => prevStep.map(x => {
      if (x.key === activeStep.key) x.isDone = false;
      return x;
    }))
    setActiveStep(steps[index - 1]);
  }


  return (
    <Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant='h4' sx={{ mb: 3, textAlign: "center", fontWeight: 700 }}>Please select an Option</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ justifyContent: "space-evenly" }}
            >
              <FormControlLabel value="fixedBid" control={<Radio />} label="Fixed Bid" labelPlacement="bottom" onChange={(e) => !!e.target.checked && handleClose("fixedBid")} />
              <FormControlLabel value="staffAug" control={<Radio />} label="Staff Augementation" labelPlacement="bottom" onChange={(e) => !!e.target.checked && handleClose("staffAug")} />
            </RadioGroup>
          </Box>
        </Fade>
      </Modal>
      {selectedOption === "fixedBid" ?
        <Box className="App" sx={{ p: 2 }}>
          <div className='box'>
            <Topbar title="Create a new proposal"  >
              <div className='flex mt-3 gap-10'>
                {steps?.map((step, i) => {
                  return (
                    <div className='flex gap-5 items-center'>
                      <p key={i} className={`fs-12 px-3 py-2 mb-0 text-nowrap ${activeStep.key === step.key && 'bg-primary-shadow rounded-10 c-primary fw-700'}`}>{step.label}</p>
                      {steps?.length - 1 !== i && < ChevronRightIcon className='fs-18' />}
                    </div>)
                })}
                {activeStep.key === "firstStep" && <Button disabled={!saveForm} classes="fs-12 w-100p" onClick={handleHeaderBtnClick}>Review Details</Button>}
                {activeStep.key === "secondStep" && <Button classes="fs-12 w-100p" onClick={handleHeaderBtnClick}>Submit Proposal</Button>}
                {activeStep.key === "thirdStep" && <Button classes="fs-12 w-100p" onClick={handleHeaderBtnClick}>Partner Selection</Button>}
                {activeStep.key === "fourthStep" && <Button classes="fs-12 w-100p" onClick={handleHeaderBtnClick}>Confirm Partners</Button>}

              </div>
            </Topbar>
            <div className='form-container'>
              <div className="step-component">
                {activeStep.component({ handleChange: handleChange, form: form, setForm: setForm, formError: formError, timelineList: timeLineStatus, handleBack: handleBack, activeStep: activeStep, favouriteListView: favouriteListView, setFavouriteListView: setFavouriteListView, isEditMode: isEditMode, handleEdit: handleEdit, handleSaveForm: handleSaveForm, selectedVendors: selectedVendors, setSelectedVendors: setSelectedVendors, discardSelectedVendor: discardSelectedVendor, setDiscardSelectedVendor: setDiscardSelectedVendor, filteredVendorList: filteredVendorList, setFilteredVendorList: setFilteredVendorList, finalSelectedPartner: finalSelectedPartner, setFinalSelectedPartner: setFinalSelectedPartner })}
              </div>
            </div>
          </div>
        </Box> : null
      }

    </Box >
  );
}


export default CreateProposals;