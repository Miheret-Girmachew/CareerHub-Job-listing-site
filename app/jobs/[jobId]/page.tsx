import { fetchJobById } from '../../../lib/api';
import { JobPost } from '../../../types/index';

function formatDate(date:string){
  const ios = new Date(date);
  
  var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
return m[(ios.getMonth())]+' '+ ios.getFullYear()+','+ios.getDate();
}

const getJobData = async (jobId: string): Promise<JobPost> => {
  return await fetchJobById(jobId);
};

interface JobPageProps {
  jobId: string;
}

const JobPage = async ({ params }: { params: { jobId: string } }) => {
  const job = await getJobData(params.jobId);
console.log("id" , job)

const responsibilitiesArray = job.responsibilities.split('\n');
  return (
    
    <div className="flex flex-row gap-[15%] m-10">
    <div className="w-60p">
      <p className="text-custom-blue font-black text-2xl font-poppins pt-5 pb-3">
        Description
      </p>
        <p className="text-custom-blue font-epilogue font-normal text-base leading-[25.6px]  ">
          {job.description}
        </p>

      <p className="text-custom-blue font-black text-2xl font-poppins pb-3 pt-10">
        Responsibilities
      </p>
        <div >
        {responsibilitiesArray.map((line, index) => (
        <p key={index} className="flex flex-row text-custom-blue font-epilogue font-normal text-base leading-[25.6px] pb-2 gap-1.5">
           <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#56CDAD
"
                className="size-6 ">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>{line}</p>
      ))}
       
      </div>

      <p className="text-custom-blue font-black text-2xl font-poppins pb-3 pt-10">
        Ideal Candidate we want </p>
        <ul className="list-disc pl-5  ">
        <li className=" text-custom-blue font-epilogue font-bold text-base leading-[25.6px] pb-1">{job.idealCandidate}</li>
        </ul>
       
      <p className="text-custom-blue font-black text-2xl font-poppins pb-3 pt-10">
        When and Where</p>
        <div className="flex flex-row items-center">
          <div className="border border-solid border-slate-300 rounded-full p-1 flex justify-center items-center mr-1">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="rgb(56 189 248)"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
          </div>
          <p>{job.whenAndWhere}</p>
        </div>
      </div>
      
<div className="w-[293.5px] h-[674px] gap-[20px] pr-32">
<div className="mb-4 md:mb-0">
<div className="flex flex-col">
          <h2 className="mb-6 font-Poppins font-black text-2xl leading-[28.8px] text-[#25324B]">About</h2>
        </div>

        <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 mb-3">
              <div className="border border-solid border-slate-300 rounded-full p-1 flex justify-center items-center px-2.5 ">
                <div>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 12C21.5 16.9706 17.4706 21 12.5 21C7.52944 21 3.5 16.9706 3.5 12C3.5 7.02944 7.52944 3 12.5 3M12.5 3C13.9368 3 15.295 3.33671 16.5 3.93552C16.5 3.93552 15.3085 3.40681 14.5 3.22302C13.7337 3.0488 12.5 3 12.5 3ZM12.5 9V15M15.5 12H9.5" stroke="#26A4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        </div>
                
        <div className="flex flex-col">
          <p className="font-epilogue text-[#515B6F] text-base font-normal">Posted on</p>
          <p className="font-epilogue font-semibold text-base text-[#25324B]">{formatDate(job.datePosted)}</p>
        </div>
      </div>

      </div>
        </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="flex gap-4 mb-3">
              <div className="border border-solid border-slate-300 rounded-full p-1 flex justify-center items-center px-2.5  ">
                <div>
                  <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.96777 8.39451L8.96552 8.39634L8.96338 8.39842L8.96777 8.39451ZM18.9219 8.20798C18.8523 8.14093 18.7751 8.08226 18.6919 8.03317C18.5741 7.96383 18.4433 7.9194 18.3076 7.90261C18.1719 7.88583 18.0343 7.89705 17.9031 7.93558C17.7719 7.97412 17.6501 8.03915 17.5451 8.12665C17.44 8.21415 17.3541 8.32227 17.2925 8.44431C16.948 9.123 16.4729 9.727 15.8945 10.2217C15.9829 9.72326 16.0275 9.21807 16.0278 8.71188C16.0296 7.17198 15.6234 5.65909 14.8504 4.32725C14.0775 2.9954 12.9654 1.89217 11.6274 1.12988C11.48 1.04633 11.3138 1.00159 11.1444 0.999869C10.9749 0.998144 10.8079 1.03949 10.6588 1.12003C10.5097 1.20056 10.3836 1.31765 10.2922 1.46029C10.2008 1.60294 10.1471 1.76648 10.1362 1.93555C10.0802 2.88373 9.83233 3.81067 9.40756 4.66022C8.98279 5.50977 8.38996 6.26424 7.665 6.87791L7.43453 7.06541C6.67644 7.5755 6.00543 8.20431 5.44723 8.92771C4.57955 10.0208 3.97848 11.3011 3.69169 12.6669C3.4049 14.0327 3.44028 15.4466 3.79503 16.7964C4.14977 18.1462 4.81412 19.3947 5.7354 20.4431C6.65667 21.4914 7.80953 22.3107 9.10254 22.8359C9.25436 22.898 9.41911 22.9217 9.58226 22.905C9.74542 22.8883 9.90195 22.8317 10.0381 22.7402C10.1742 22.6488 10.2857 22.5252 10.3628 22.3804C10.4398 22.2357 10.4801 22.0741 10.48 21.9101C10.4793 21.8041 10.4625 21.6987 10.4302 21.5976C10.2065 20.7567 10.142 19.8813 10.2403 19.0166C11.1865 20.8013 12.7054 22.216 14.5528 23.0332C14.7782 23.1341 15.0332 23.1476 15.2681 23.0713C16.7277 22.6002 18.0425 21.7637 19.0877 20.6413C20.133 19.5189 20.8738 18.1479 21.24 16.6586C21.6061 15.1692 21.5853 13.611 21.1796 12.1319C20.7739 10.6528 19.9967 9.30209 18.9219 8.20798ZM15.0171 21.039C14.1454 20.5973 13.3765 19.977 12.7602 19.2185C12.144 18.46 11.6943 17.5804 11.4404 16.6367C11.3629 16.319 11.3029 15.9972 11.2607 15.6728C11.2322 15.4663 11.1398 15.2738 10.9965 15.1224C10.8532 14.9709 10.6661 14.868 10.4614 14.8281C10.3984 14.8157 10.3343 14.8095 10.27 14.8096C10.0942 14.8095 9.92158 14.8558 9.76941 14.9437C9.61725 15.0317 9.49096 15.1582 9.4033 15.3106C8.57357 16.7417 8.1563 18.3746 8.19773 20.0283C7.46797 19.4609 6.85808 18.7543 6.40341 17.9495C5.94873 17.1447 5.65832 16.2576 5.549 15.3397C5.43968 14.4218 5.51363 13.4914 5.76655 12.6023C6.01948 11.7131 6.44636 10.8831 7.02244 10.1602C7.45985 9.592 7.98753 9.09945 8.58444 8.70216C8.61029 8.68548 8.63507 8.66722 8.65866 8.64747C8.65866 8.64747 8.95535 8.40199 8.96549 8.39637C10.3902 7.19134 11.4035 5.57189 11.8642 3.76368C12.9538 4.77092 13.6803 6.10971 13.931 7.57219C14.1816 9.03467 13.9424 10.539 13.2505 11.8516C13.159 12.0267 13.1215 12.225 13.1427 12.4215C13.1638 12.6179 13.2427 12.8037 13.3693 12.9554C13.4959 13.107 13.6646 13.2178 13.8541 13.2737C14.0436 13.3297
14.2454 13.3282 14.4341 13.2696C15.9658 12.7894 17.3138 11.8515 18.2964 10.5821C18.8869 11.4544 19.273 12.4487 19.4259 13.4909C19.5787 14.5332 19.4944 15.5965 19.1792 16.6016C18.864 17.6068 18.326 18.5278 17.6054 19.2961C16.8847 20.0644 16 20.6602 15.0171 21.0391L15.0171 21.039Z"
                  fill="#26A4FF"
                />
              </svg>
              </div>
            </div>
              
            <div className="flex flex-col">
              <p className="font-epilogue text-[#515B6F] text-base font-normal">Deadline</p>
              <p className="font-epilogue font-semibold text-base text-[#25324B]">{formatDate(job.deadline)}</p>
            </div>
          </div>
              
          </div>
          </div>
          <div className="flex flex-row">
          <div className="flex flex-col">
              <div className="flex gap-4 mb-3">
              <div className="border border-solid border-slate-300 rounded-full p-1 flex justify-center  items-center px-2.5">
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10.5005C15 9.11924 13.8808 8 12.5005 8C11.1192 8 10 9.11924 10 10.5005C10 11.8808 11.1192 13 12.5005 13C13.8808 13 15 11.8808 15 10.5005Z" stroke="#26A4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4995 21C11.301 21 5 15.8984 5 10.5633C5 6.38664 8.3571 3 12.4995 3C16.6419 3 20 6.38664 20 10.5633C20 15.8984 13.698 21 12.4995 21Z" stroke="#26A4FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div></div>
              

          <div>
          <p className="font-epilogue text-[#515B6F] text-base font-normal">Location</p>
            <div className="font-epilogue font-semibold text-base text-[#25324B]">{job.location.map((resp,idx)=>(
              <p>{resp}</p>
            ))}</div>
             
          </div></div>
        
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="flex gap-4 mb-3">
                <div className="border border-solid border-slate-300 rounded-full p-1 flex justify-center items-center px-2.5">
                  <div>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.25 3V5.25M17.75 3V5.25M3.5 18.75V7.5C3.5 6.25736 4.50736 5.25 5.75 5.25H19.25C20.4926 5.25 21.5 6.25736 21.5 7.5V18.75M3.5 18.75C3.5 19.9926 4.50736 21 5.75 21H19.25C20.4926 21 21.5 19.9926 21.5 18.75M3.5 18.75V11.25C3.5 10.0074 4.50736 9 5.75 9H19.25C20.4926 9 21.5 10.0074 21.5 11.25V18.75" stroke="#26A4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 12.8768C10.5 12.5906 10.8069 12.4092 11.0577 12.5471L14.9179 14.6703C15.1779 14.8132 15.1779 15.1868 14.9179 15.3297L11.0577 17.4529C10.8069 17.5908 10.5 17.4094 10.5 17.1232V12.8768Z" stroke="#26A4FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
</div>
            <div>
            <p className="font-epilogue text-[#515B6F] text-base font-normal">Start Date</p>
            <p className="font-epilogue font-semibold text-base text-[#25324B]">{formatDate(job.startDate)}</p>
            </div></div>
         </div>
          </div>
          <div className="flex flex-row gap-4 mb-3">
          <div className="border border-solid border-slate-300 rounded-full p-1 flex justify-center  items-center px-2.5 ">
            <div>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.25 3V5.25M17.75 3V5.25M3.5 18.75V7.5C3.5 6.25736 4.50736 5.25 5.75 5.25H19.25C20.4926 5.25 21.5 6.25736 21.5 7.5V18.75M3.5 18.75C3.5 19.9926 4.50736 21 5.75 21H19.25C20.4926 21 21.5 19.9926 21.5 18.75M3.5 18.75V11.25C3.5 10.0074 4.50736 9 5.75 9H19.25C20.4926 9 21.5 10.0074 21.5 11.25V18.75" stroke="#26A4FF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 14.7222L12.2778 16.5L14.9444 12.5" stroke="#26A4FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div></div>
              <div className="flex flex-col">
              <p className="font-epilogue text-[#515B6F] text-base font-normal">End Date</p>
              <p className="font-epilogue font-semibold text-base text-[#25324B]">{formatDate(job.endDate)}</p>
              </div>
              <div>
           </div>
          </div>
        </div>

 <hr></hr>

<div className="mb-3 mt-2">
  <p className="text-custom-blue font-black text-2xl font-poppins pb-3 "> Categories</p>
  <div className=" flex auto-rows-auto gap-2 mb-3  ">
          {job.categories.map((resp, idx) => (
            <p
              key={idx}
              className="border border-solid p-1 rounded-2xl bg-[#f6e9df] text-[#FFB836] text-xs font-epilogue font-semibold px-1.5 py-2.5"
            >
              {resp}
            </p>
          ))}
        </div>
      </div>
      <hr></hr>
      <div className="mt-2">
        <p className="text-custom-blue font-black text-2xl font-poppins pb-3">
          Required Skills
        </p>
        <div className=" flex  gap-2  ">
          {job.requiredSkills.map((resp, idx) => (
            <p
              className="border border-solid px-1 py-3 border-transparent bg-[#F8F8FD] text-[#4640DE] font-epilogue font-normal text-base"
              key={idx}
            >
              {resp}
            </p>
          ))}
        </div>
      </div>
    </div>
    </div>

    
  );
}

export default JobPage;