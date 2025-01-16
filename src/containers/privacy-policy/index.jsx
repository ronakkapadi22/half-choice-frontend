import React, { useMemo } from 'react'
import Breadcrumb from '../../shared/breadcrumb'

const PrivacyPolicy = () => {

  const links = useMemo(() => [
    {
      id: 'privacy-policy',
      label: 'Privacy & Policy'
    }
  ], [])

  return (
    <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="w-full" >
        <Breadcrumb links={links} />
      </div>
      <div className="w-full flex flex-col items-start justify-start my-9">
        <h2 className="text-3xl text-text mb-4 font-semibold">Privacy Policy</h2>
        <p className="text-slate-400 text-md mb-2">
          This Privacy Policy sets out the ways in which we collect, use and disclose information in connection with the use and operation of the halfchoice mobile app, including personal information about you, visitors and representatives.
        </p>
        <p className="text-slate-400 text-md mb-2">
          This Privacy Notice describes the types of personal information we collect, how we store, handle and use the information, with whom we share it, and the choices you can make about our collection, use and disclosure of the information. We also describe the measures we take to protect the security of the information and how you can contact us about our privacy practices.
        </p>
        <p className="text-slate-400 text-md mb-2">
          If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.
        </p>
        <p className="text-slate-400 text-md mb-2">
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at English Alphabet unless otherwise defined in this Privacy Policy.
        </p>
        <p className="text-text font-medium text-lg text-md mb-2 mt-4">
          Information Collection And Use
        </p>
        <p className="text-slate-400 text-md mb-2">
          Personal data means any information about an individual, whether recorded in a material form or not and whether true or not, who can be identified from that data (whether directly or indirectly), or from that data and other data to which we have or are likely to have access.
        </p>
        <p className="text-slate-400 text-md mb-2">
          We collect personal information from users when they create an account on our App, place an order, or contact customer support. The types of personal information we collect may include:
        </p>
        <ul className='text-slate-400 text-md list-disc pl-6 mb-2' >
          <li>Name</li>
          <li>Address</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Payment information (Transaction data, such as details about orders and payments )</li>
          <li>Demographic information such as postcode, address, mobile number, login name, preferences and interests.</li>
          <li>Profile data, such as your username and password, orders related to you, your interests, preferences, feedback and survey responses</li>
        </ul>
        <p className="text-slate-400 text-md mb-2">
          Using Our Services, we may collect and store information about you to process your requests and automatically complete forms for future transactions, including (but not limited to) your phone number, address, email, billing information, invoices, etc.
        </p>
        <p className="text-slate-400 text-md mb-2">
          Other information relevant to customer surveys and/or offers.
        </p>
        <p className="text-slate-400 text-md mb-2">
          App install, uninstall, and other installed apps information.
        </p>
        <p className="text-slate-400 text-md mb-2">
          You may request when you would like to review the information you have provided and halfchoice shall ensure that any personal information or sensitive personal data or information found to be inaccurate or deficient shall be corrected or amended as feasible.
        </p>
        <p className="text-text mb-2 mt-4 font-semibold text-md">
          WHAT WE DO WITH THE INFORMATION WE GATHER
        </p>
        <p className="text-slate-400 text-md mb-2">
          We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
        </p>
        <ul className='text-slate-400 text-md list-disc pl-6' >
          <li>Internal Record Keeping</li>
          <li>We may use the information to improve our Services. We may use this information to:</li>
          <li>Allow you to use Services on the Halfchoice App and to carry out our obligations arising from any contracts between you and us</li>
          <li>Allow you to undertake or initiate any transactions on the Halfchoice App</li>
          <li>To inform your usage of the Halfchoice App and to manage your account with Halfchoice App</li>
          <li>To process the payments with respect to the transactions which you may avail on the Halfchoice App and to perform ancillary Services</li>
          <li>To respond to your comments. reviews and questions, in order to provide customer support and better Services</li>
          <li>To communicate important notices and changes to the Services provided on the Halfchoice App</li>
          <li>To track the order status, processing, and delivery of Services as per your applicability</li>
          <li>For any other purposes with your consent.</li>
          <li>We may periodically send promotional emails, SMSs and make voice calls about new products, special offers or other information which we think you may find interesting using the email address and mobile number which you have provided.</li>
          <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, SMS, voice, fax or mail. We may use the information to customize the website according to your interests.</li>
          <li>You may specifically opt-out of the above in accordance with the Telecom Commercial Communications Customer Preference Regulations, 2018 or otherwise specified.</li>
        </ul>
        <h2 className="text-3xl text-text mb-4 mt-8 font-semibold">Security</h2>
        <p className="text-slate-400 text-md mb-2">
          We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures in accordance with the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 (“IT RSP Rules”) to safeguard and secure the information we collect online. We do not retain any information collected from you for any longer than is reasonably required by us for the purpose of our Services or such period as may be required by applicable laws in India. You are required to keep your information and all the other data you obtain on the Halfchoice App strictly confidential.
        </p>
        <p className="text-text mb-2 mt-4 font-semibold text-md">
          Children’s Privacy
        </p>
        <p className="text-slate-400 text-md mb-2">
          Our Service does not address anyone under the age of 18 (“Children”).
          We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
        </p>
        <p className="text-text mb-2 mt-4 font-semibold text-md">
          Changes To This Privacy Policy
        </p>
        <p className="text-slate-400 text-md mb-2">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p className="text-slate-400 text-md mb-2">
          We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the “effective date” at the top of this Privacy Policy.
        </p>
        <p className="text-slate-400 text-md mb-2">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        <p className="text-text mb-2 mt-4 font-semibold text-md">How to contact us</p>
        <p className="text-slate-400 text-md mb-2">If you have any questions or comments about this Privacy Notice, or if you would like us to update information we have about you or your preferences, please contact us by email at <b>info@halfchoice.in</b> If you notice any discrepancies in the information provided to us or have any grievance against us, you may contact our Grievance Officer. The details of the Grievance Officer are as follows: <b>info@halfchoice.in</b></p>
      </div>
    </div>
  )
}

export default PrivacyPolicy