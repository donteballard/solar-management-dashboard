import axios from "axios";
import Url from "@/services/Url.js";

const headers = () => {
  const jwtToken = localStorage.getItem("token")
  let headers = {}

  return (jwtToken) ? Object.assign(headers, {"Authorization": `Bearer ${jwtToken}`}) : headers
}

const apiJSONClient = () => {
  return axios.create({
    baseURL: Url.https(),
    withCredentials: false,
    headers: Object.assign(headers(), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  });
}

const apiUploaderClient = () => {
  return axios.create({
    baseURL: Url.https(),
    withCredentials: false,
    headers: Object.assign(headers(), {
      "Content-Type": "multipart/form-data"
    })
  });
}

const apiCSVClient = () => {
  return axios.create({
    baseURL: Url.https(),
    withCredentials: false,
    headers: Object.assign(headers(), {
      "Content-Type": "text/csv"
    })
  });
}

const apiPDFClient = () => {
  return axios.create({
    baseURL: Url.https(),
    withCredentials: false,
    responseType: 'blob',
    headers: Object.assign(headers(), {
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
  })
}


//TODO: this is where all API calls are configured to the API
export default {
  // auth
  login(user) {
    return apiJSONClient().post("/login", user);
  },
  getLogsAll() {
    return apiJSONClient().get("/sitelogs/all");
  },
  getLogsBySiteId(siteId) {
    return apiJSONClient().get(`/sites/${siteId}/sitelogs/all`);
  },
  getUser(id) {
    return apiJSONClient().get("/user/" + id);
  },

  // sites
  getAllSites() {
    return apiJSONClient().get("/sites");
  },
  getSitesGrid() {
    return apiJSONClient().get("/sites/grid");
  },
  getInverterMetricsBySiteAndDate(siteId, date) {
    return apiJSONClient().get(`/sites/${siteId}/inverters/metrics_by_date?date=${date}`);
    // sites/1800/inverters/metrics_by_date?date=2020-12-19
  },
  getSites(metricsEndDate) {
    return apiJSONClient().get("/sites/?date=" + metricsEndDate);
  },
  getSitesFuture(metricsEndDate) {
    return apiJSONClient().get("/sites_future?date=" + metricsEndDate);
  },
  getSitesFutureAll(metricsEndDate) {
    return apiJSONClient().get("/sites_future_all?date=" + metricsEndDate);
  },
  // Customer
  getCustomers() {
    return apiJSONClient().get("/customers");
  },
  updateCustomer(id, params) {
    const customer = {customer: params}
    return apiJSONClient().post(`/customers/${id}/update`, customer)
  },
  createCustomer(params) {
    const customer = {customer: params}
    return apiJSONClient().post(`/customers/create`, customer)
  },
  deleteCustomer(id) {
    return apiJSONClient().delete(`/customers/${id}`)
  },
  // Account
  getAccounts() {
    return apiJSONClient().get("/accounts");
  },
  getAccount(id) {
    return apiJSONClient().get(`/accounts/${id}`);
  },
  updateAccount(id, params) {
    const account = {account: params}
    return apiJSONClient().post(`/accounts/${id}/update`, account)
  },
  createAccount(params) {
    const account = {user_id: '', account: params}
    return apiJSONClient().post(`/accounts/create`, account)
  },
  deleteAccount(id) {
    return apiJSONClient().delete(`/accounts/${id}`)
  },
  // Contact
  getContacts() {
    return apiJSONClient().get("/contacts");
  },
  getContact(id) {
    return apiJSONClient().get(`/contacts/${id}`);
  },
  updateContact(id, params) {
    const contact = {contact: params}
    return apiJSONClient().post(`/contacts/${id}/update`, contact)
  },
  createContact(params) {
    const contact = {contact: params}
    return apiJSONClient().post(`/contacts/create`, contact)
  },
  deleteContact(id) {
    return apiJSONClient().delete(`/contacts/${id}`)
  },
  // Reporting Groups
  getReportingGroups() {
    return apiJSONClient().get("/reportinggroups");
  },
  getReportingGroup(id) {
    return apiJSONClient().get(`/reportinggroups/${id}`);
  },
  updateReportingGroup(id, params) {
    const rg = {
      id: id,
      reporting_group: params
    }
    return apiJSONClient().post(`/reportinggroups/${id}/update`, rg)
  },
  createReportingGroup(params) {
    const rg = {reporting_group: params}
    return apiJSONClient().post(`/reportinggroups/create`, rg)
  },
  deleteReportingGroup(id) {
    return apiJSONClient().delete(`/reportinggroups/${id}`)
  },
  // Case Notes
  getCasesNotDone() {
    return apiJSONClient().get("/cases_not_done");
  },
  getCasesByStatus(status) {
    return apiJSONClient().get(`/cases_by_status/${status}`);
  },
  getCaseNotes() {
    return apiJSONClient().get("/casenotes");
  },
  getCaseNotesByCase(case_id) {
    return apiJSONClient().get(`/casenotes_by_case/${case_id}`);
  },
  getCaseLostProduction(case_id) {
    return apiJSONClient().get(`/cases/${case_id}/lost_production`);
  },
  getCaseDowntimePct(case_id) {
    return apiJSONClient().get(`/cases/${case_id}/downtime_pct`);
  },
  getCaseDetermineQtr(case_id, start_date, end_date) {
    return apiJSONClient().get(`/cases/${case_id}/determine_qtr?start_date=${start_date}&end_date=${end_date}`);
  },  
  createCaseNote(params) {
    const c = {case_note: params}
    return apiJSONClient().post(`/casenotes/create`, c)
  },
  updateCaseNote(id, params) {

    const c = {
      id: id,
      case_note: params
    }
    return apiJSONClient().post(`/casenotes/${id}/update`, c)
  },
  deleteCaseNote(id) {
    return apiJSONClient().delete(`/casenotes/${id}`)
  },
  // CaseStatus
  getCaseStatus() {
    return apiJSONClient().get("/casestatus");
  },
  createCaseStatus(params) {
    const c = {case_status: params}
    return apiJSONClient().post(`/casestatus/create`, c)
  },
  getCaseCategories() {
    return apiJSONClient().get("/casecategories");
  },
  createCaseCategory(params) {
    const c = {case_category: params}
    return apiJSONClient().post(`/casecategories/create`, c)
  },
  getCasePriorities() {
    return apiJSONClient().get("/casepriorities");
  },
  createCasePriority(params) {
    const c = {case_priority: params}
    return apiJSONClient().post(`/casepriorities/create`, c)
  },
  // Cases
  getCases() {
    return apiJSONClient().get("/cases");
  },
  getCase(id) {
    return apiJSONClient().get(`/cases/${id}`);
  },
  updateCase(id, params) {
    // convert pct to float
    params.downtime_pct = parseFloat(params.downtime_pct)

    const c = {
      id: id,
      case: params
    }

    return apiJSONClient().post(`/cases/${id}/update`, c)
  },
  createCase(params) {
    params.downtime_pct = parseFloat(params.downtime_pct)
    const c = {case: params}
    return apiJSONClient().post(`/cases/create`, c)
  },
  deleteCase(id) {
    return apiJSONClient().delete(`/cases/${id}`)
  },
  // Billing Plans
  getBillingPlans() {
    return apiJSONClient().get("/billingplans");
  },
  createBillingPlan(params) {
    const bp = {billing_plan: params}
    return apiJSONClient().post(`/billingplans/create`, bp)
  },
  updateBillingPlan(id, params) {
    const bp = {
      id: id,
      billing_plan: params
    }
    return apiJSONClient().post(`/billingplans/${id}/update`, bp)
  },
  deleteBillingPlan(id) {
    return apiJSONClient().delete(`/billingplans/${id}`)
  },
  // Alerts
  getAlerts() {
    return apiJSONClient().get(`/alerts`);
  },
  removeAlert(key) {
    return apiJSONClient().get(`/alerts/${key}/remove`)
  },
  // Estimates
  getEstimates(date) {
    return apiJSONClient().get(`/estimates/missing?date=${date}`);
  },
  // Site
  getSite(id) {
    return apiJSONClient().get("/sites/" + id);
  },
  getSiteWithInvDetail(id) {
    return apiJSONClient().get(`/sites/${id}/with_inv_detail`);
  },
  getSiteMonthlyStats(id, month, year) {
    return apiJSONClient().get(`/sites/${id}/get_monthly_stats?month=${month}&year=${year}`);
  },
  updateSiteMonthlyKwh(id, month, year, kwh) {
    return apiJSONClient().post(`/sites/${id}/update_monthly_kwh`, {month, year, kwh});
  },
  getSiteYearlyComboStats(id, year) {
    const promise1 = this.getSiteYearlyStats(id, year);
    const promise2 = this.getSiteCompEnergyMonth(id)
    return Promise.all([promise1, promise2]);
  },
  getSiteYearlyStats(id, year) {
    return apiJSONClient().get(`/sites/${id}/get_yearly_stats?year=${year}`);
  },
  getSiteMetricYears(id) {
    return apiJSONClient().get(`/sites/${id}/get_metric_years`);
  },
  getSiteCompEnergyMonth(id) {
    return apiJSONClient().get(`/sites/${id}/get_comp_energy_month`);
  },
  getSiteCompEnergyYear(id) {
    return apiJSONClient().get(`/sites/${id}/get_comp_energy_year`);
  },
  createSite(params) {
    return apiJSONClient().post('/sites/create', params)
  },
  createSiteNew(params) {
    const site = {site: params}
    return apiJSONClient().post('/sites/create', site)
  },
  updateSite(id, params) {
    return apiJSONClient().post(`/sites/${id}/update`, params)
  },
  updateSiteGrid(id, params) {
    delete params.solar_module_wattage;
    let annual_visit = params.annual_visit
    params.annual_visit = annual_visit == "Y"
    const site = {
      "id": id,
      "site": params
    }
    return apiJSONClient().post(`/sites/${id}/update_grid`, site)
  },
  deleteSite(id) {
    return apiJSONClient().delete(`sites/${id}`);
  },
  getSiteData(id, params) {
    return apiJSONClient().post(`/sites/${id}/get_data`, params);
  },
  getAllSiteData(params) {
    return apiJSONClient().post(`/sites/get_data`, params);
  },
  getPvWattsRateLimit() {
    return apiJSONClient().get("/sites/pvwatts/get_rate_limit");
  },
  getPvWattsRateRemaining() {
    return apiJSONClient().get("/sites/pvwatts/check_rate_remaining");
  },
  getSiteDataForProvider(provider, params) {
    return apiJSONClient().post(`/providers/${provider}/get_provider_data`, params);
  },
  getMissingStatsForProvider(provider, params) {
    return apiJSONClient().post(`/providers/${provider}/get_missing_stats`, params);
  },
  getPossibleSolutions(site_id) {
    return apiJSONClient().get(`/metrics/sites/${site_id}/possible_solutions`);
  },
  getMissingKwh(date) {
    return apiJSONClient().get(`/kwhestimates/missing?date=${date}`);
  },
  uploadSiteData(file) {
    let formData = new FormData();
    formData.append("file", file);

    return apiUploaderClient().post(`/upload/sites/create`, formData)
  },
  uploadKwhData(file) {
    let formData = new FormData();
    formData.append("file", file);
    return apiUploaderClient().post(`/upload/sites/kwh`, formData)
  },
  missingInverterTof() {
    return apiJSONClient().get("/inverters/missing_tof");
  },
  reloadInverterTof() {
    return apiJSONClient().get("/inverters/reload_tof");
  },
  missingSiteTof() {
    return apiJSONClient().get("/sites/metrics/missing_tof");
  },
  missingSiteGeo() {
    return apiJSONClient().get("/sites/metrics/missing_geom");
  },
  reloadSiteTof() {
    return apiJSONClient().get("/sites/metrics/reload_tof");
  },
  downloadSitesCSVTemplate () {
    return apiCSVClient().get('/download/sites/template')
  },
  downloadFilterCSVTemplate(name) {
    return apiCSVClient().get(`/api_filters_template?name=${name}`)
  },
  exportSitesCSVReport (from, until) {
    return apiCSVClient().get(`/export/sites/report?from=${from}&until=${until}`)
  },
  exportSitesCSVReportFiltered (params) {
    return apiJSONClient().post(`/export/sites/reportfiltered`, params)
  },
  getProviderInverterListCSVReport (provider) {
    return apiCSVClient().get(`/download/providers/${provider}/inverterlist`)
  },
  getProviderInverterListCSVReportNoFilter (provider) {
    return apiCSVClient().get(`/download/providers/${provider}/inverterlist`)
  },
  getProviderInverterListCSVReport (provider, filterId) {
    return apiCSVClient().get(`/download/providers/${provider}/inverterlist_filtered?filterId=${filterId}`)
  },
  getProviderSiteListCSVReportNoFilter (provider) {
    return apiCSVClient().get(`/download/providers/${provider}/sitelist_nofilter`)
  },
  getProviderSiteListCSVReport (provider, filterId) {
    return apiCSVClient().get(`/download/providers/${provider}/sitelist_filtered?filterId=${filterId}`)
  },
  getProviderIdSiteListCSVReport (provider, filterId) {
    return apiCSVClient().get(`/download/providers/${provider}/id_sitelist_filtered?filterId=${filterId}`)
  },
  uploadSitePlan(file, site_id) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("site_id", site_id);
    return apiUploaderClient().post(`/upload/sites/plan`, formData)
  },
  // inverters
  getInvertersGrid(siteId) {
    return apiJSONClient().get(`/sites/${siteId}/inverters/grid`);
  },
  createInverter(siteId) {
    return apiJSONClient().post(`/sites/${siteId}/inverters/create`);
  },
  createInverterNew(siteId, params) {
    const inverter = { inverter: params }
    console.log(inverter)
    return apiJSONClient().post(`/sites/${siteId}/inverters/create`, inverter)
  },
  updateInverter(siteId, inverterId, params) {
    return apiJSONClient().post(`/sites/${siteId}/inverters/${inverterId}/update`, params);
  },
  updateInverterGrid(site_id, inverter_id, params) {
    const inverter = {
      "id": inverter_id,
      "inverter": params,
      "site_id": site_id
    }
    return apiJSONClient().post(`/sites/${site_id}/inverters/${inverter_id}/update_grid`, inverter)
  },
  deleteInverter(siteId, inverterId) {
    return apiJSONClient().delete(`/sites/${siteId}/inverters/${inverterId}`);
  },
  getFilters(monitoringSystem) {
    return apiCSVClient().get(`/api_filters?monitoring_system=${monitoringSystem}`)
  },
  deleteFilter(id) {
    return apiJSONClient().delete(`/api_filters/${id}`)
  },
  uploadInverterData (file) {
    let formData = new FormData();
    formData.append("file", file);

    return apiUploaderClient().post(`/upload/inverters/create`, formData)
  },
  downloadInvertersCSVTemplate () {
    return apiCSVClient().get('/download/inverters/template')
  },

  uploadSolaredgeFilterData (file, filterName, monitoringSystem) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("filterName", filterName)
    formData.append("monitoringSystem", monitoringSystem)

    return apiUploaderClient().post(`/upload/monitorapifilters/create`, formData)
  },
  // daily checks
  addCheck(userId, params) {
    return apiJSONClient().post(`user/${userId}/add_check`, params)
  },
  // site notes
  getNotes(siteId) {
    return apiJSONClient().get(`/sites/${siteId}/notes/all`);
  },
  // site cases
  getCasesBySiteId(siteId) {
    return apiJSONClient().get(`/sites/${siteId}/cases/all`);
  },
  createNote(siteId, params) {
    return apiJSONClient().post(`/sites/${siteId}/notes/create`, params);
  },
  updateNote(siteId, noteId, params) {
    return apiJSONClient().post(`/sites/${siteId}/notes/${noteId}/update`, params);
  },
  deleteNote(siteId, noteId) {
    return apiJSONClient().delete(`/sites/${siteId}/notes/${noteId}`);
  },
  getNoteAttachments(noteId) {
    return apiJSONClient().get(`casenotes/${noteId}/attachments`);
  },
  uploadAttachment(file, case_note_id) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("case_note_id", case_note_id);
      return apiUploaderClient().post(`/upload/attachments/create`, formData)
  },
  deleteCaseAttachement(case_attachment_id) {
    return apiJSONClient().delete(`/casenoteattachments/${case_attachment_id}`);
  },
  downloadCaseWorkOrderPDF(case_id, params) {
    return apiPDFClient().post(`/download/cases/${case_id}/reportpdf`, params)
  },
  // app settings
  getSettings() {
    return apiJSONClient().get('/app_settings');
  },
  saveSettings(params) {
    return apiJSONClient().post('/app_settings/save', params);
  }
};
