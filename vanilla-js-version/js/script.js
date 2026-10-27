/* ChariGo demo: plain JavaScript only. No network, payment, authentication, or database.
   Per-tab sessionStorage keeps mock data during navigation; memory is used if storage is unavailable. */
"use strict";

const FIELD_DEFINITIONS = [
  {"screen": "47:39", "id": "login-email", "x": 34.6, "y": 274.1, "width": 322.8, "height": 40.3, "type": "text", "label": "Email or Phone", "placeholder": "Email or Phone", "fontSize": 16, "required": true, "paddingLeft": 12},
  {"screen": "47:39", "id": "login-password", "x": 33.6, "y": 328.9, "width": 322.8, "height": 40.3, "type": "password", "label": "Password", "placeholder": "Password", "fontSize": 16, "required": true, "paddingLeft": 13, "paddingRight": 40},
  {"screen": "48:90", "id": "signup-name", "x": 33.6, "y": 293.1, "width": 322.8, "height": 40.3, "type": "text", "label": "Full Name", "placeholder": "Full Name", "fontSize": 16, "required": true, "paddingLeft": 13},
  {"screen": "48:90", "id": "signup-email", "x": 33.6, "y": 347.9, "width": 322.8, "height": 40.3, "type": "text", "label": "Email or Phone", "placeholder": "Email or Phone", "fontSize": 16, "required": true, "paddingLeft": 13},
  {"screen": "48:90", "id": "signup-password", "x": 33.6, "y": 402.6, "width": 322.8, "height": 40.3, "type": "password", "label": "Password", "placeholder": "Password", "fontSize": 16, "required": true, "paddingLeft": 13, "paddingRight": 40},
  {"screen": "48:90", "id": "signup-confirm", "x": 33.6, "y": 457.4, "width": 322.8, "height": 40.3, "type": "password", "label": "Confirm Password", "placeholder": "Confirm Password", "fontSize": 16, "required": true, "paddingLeft": 13, "paddingRight": 40},
  {"screen": "59:8", "id": "search-charities", "x": 61, "y": 184, "width": 292, "height": 40, "type": "search", "label": "Search Charities", "placeholder": "Search Charities", "fontSize": 16, "paddingLeft": 0},
  {"screen": "148:382", "id": "organization-name", "x": 24, "y": 311, "width": 342, "height": 40, "type": "text", "label": "Organization Name", "placeholder": "Enter organization name", "fontSize": 14, "required": true, "paddingLeft": 14},
  {"screen": "148:382", "id": "organization-date", "x": 24, "y": 388, "width": 342, "height": 40, "type": "text", "label": "Date of Creation", "placeholder": "MM / DD / YYYY", "fontSize": 14, "required": true, "paddingLeft": 14, "inputmode": "numeric"},
  {"screen": "148:382", "id": "organization-about", "x": 24, "y": 465, "width": 342, "height": 72, "type": "text", "label": "About", "placeholder": "Tell us about your organization...", "fontSize": 14, "required": true, "multiline": true, "paddingLeft": 14, "paddingTop": 12},
  {"screen": "148:382", "id": "organization-mission", "x": 24, "y": 574, "width": 342, "height": 72, "type": "text", "label": "Mission", "placeholder": "State your mission and the change you aim to create...", "fontSize": 14, "required": true, "multiline": true, "paddingLeft": 14, "paddingTop": 12},
  {"screen": "148:382", "id": "organization-logo", "x": 24, "y": 191, "width": 342, "height": 79, "type": "file", "label": "Upload Organization Logo", "placeholder": "Upload Organization Logo", "fontSize": 16, "accept": "image/png,image/jpeg", "previewNode": "148:389"},
  {"screen": "148:382", "id": "organization-portfolio", "x": 260, "y": 700, "width": 92, "height": 30, "type": "file", "label": "Choose File", "placeholder": "Choose File", "fontSize": 16, "accept": ".pdf,.doc,.docx", "filenameNode": "148:401"},
  {"screen": "151:511", "id": "fundraiser-title", "x": 24, "y": 266, "width": 342, "height": 40, "type": "text", "label": "Fundraiser Title", "placeholder": "Enter fundraiser title", "fontSize": 14, "required": true, "paddingLeft": 14},
  {"screen": "151:511", "id": "fundraiser-goal", "x": 24, "y": 343, "width": 342, "height": 40, "type": "number", "label": "Goal Amount", "placeholder": "Enter target amount", "fontSize": 14, "required": true, "paddingLeft": 14, "min": 1, "inputmode": "decimal"},
  {"screen": "151:511", "id": "fundraiser-date", "x": 24, "y": 420, "width": 342, "height": 40, "type": "text", "label": "End Date", "placeholder": "MM / DD / YYYY", "fontSize": 14, "required": true, "paddingLeft": 14, "inputmode": "numeric"},
  {"screen": "151:511", "id": "fundraiser-about", "x": 24, "y": 497, "width": 342, "height": 72, "type": "text", "label": "About the Campaign", "placeholder": "Describe the fundraiser and what donations will support...", "fontSize": 14, "required": true, "multiline": true, "paddingLeft": 14, "paddingTop": 12},
  {"screen": "151:511", "id": "fundraiser-impact", "x": 24, "y": 606, "width": 342, "height": 72, "type": "text", "label": "Beneficiary & Impact", "placeholder": "Explain who will benefit and the expected impact...", "fontSize": 14, "required": true, "multiline": true, "paddingLeft": 14, "paddingTop": 12},
  {"screen": "151:511", "id": "fundraiser-image", "x": 24, "y": 156, "width": 342, "height": 70, "type": "file", "label": "Upload campaign image", "placeholder": "Upload campaign image", "fontSize": 16, "accept": "image/png,image/jpeg", "previewNode": "151:518"},
  {"screen": "98:559", "id": "donation-custom", "x": 260, "y": 271, "width": 106, "height": 44, "type": "number", "label": "Custom", "placeholder": "Custom", "fontSize": 14, "inputmode": "decimal", "min": 1, "required": true, "conditionSource": "111:395", "paddingLeft": 9}
];
const ACTION_DEFINITIONS = [
  {"screen": "47:39", "node": "48:125", "label": "Password", "action": "toggle-password", "field": "login-password"},
  {"screen": "48:90", "node": "48:128", "label": "Password", "action": "toggle-password", "field": "signup-password"},
  {"screen": "48:90", "node": "48:130", "label": "Password", "action": "toggle-password", "field": "signup-confirm"},
  {"screen": "59:6", "node": "75:35", "label": "Search", "hrefScreen": "59:8"},
  {"screen": "59:6", "node": "75:86", "label": "Join", "hrefScreen": "59:16"},
  {"screen": "59:15", "node": "71:7", "label": "Donation History", "hrefScreen": "147:260"},
  {"screen": "59:15", "node": "71:9", "label": "Volunteer History", "hrefScreen": "147:277"},
  {"screen": "59:8", "node": "75:121", "label": "Back", "action": "back", "hrefScreen": "59:6"},
  {"screen": "59:8", "node": "75:130", "label": "All", "action": "filter-all"},
  {"screen": "59:8", "node": "75:131", "label": "Verified", "action": "filter-verified"},
  {"screen": "59:8", "node": "75:138", "label": "Animal Welfare", "action": "filter-category", "category": "Animal Welfare"},
  {"screen": "59:8", "node": "75:142", "label": "Children", "action": "filter-category", "category": "Children"},
  {"screen": "59:8", "node": "75:149", "label": "Health", "action": "filter-category", "category": "Health"},
  {"screen": "59:8", "node": "75:162", "label": "Education", "action": "filter-category", "category": "Education"},
  {"screen": "59:8", "node": "75:179", "label": "Education", "action": "filter-category", "category": "Education"},
  {"screen": "59:8", "node": "75:186", "label": "Education", "action": "filter-category", "category": "Education"},
  {"screen": "59:8", "node": "75:192", "label": "Education", "action": "filter-category", "category": "Education"},
  {"screen": "59:8", "node": "75:199", "label": "Hunger & Poverty", "action": "filter-category", "category": "Hunger & Poverty"},
  {"screen": "59:8", "node": "75:204", "label": "Environment", "action": "filter-category", "category": "Environment"},
  {"screen": "98:559", "node": "98:586", "label": "GCash", "action": "select-payment", "payment": "GCash"},
  {"screen": "98:559", "node": "98:590", "label": "Maya", "action": "select-payment", "payment": "Maya"},
  {"screen": "98:559", "node": "98:592", "label": "Credit / Debit Card", "action": "select-payment", "payment": "Credit / Debit Card"},
  {"screen": "98:559", "node": "98:594", "label": "PayPal", "action": "select-payment", "payment": "PayPal"},
  {"screen": "98:559", "node": "98:596", "label": "Others", "action": "select-payment", "payment": "Others"},
  {"screen": "98:559", "node": "98:599", "label": "Anonymous Donation", "action": "toggle-anonymous"},
  {"screen": "151:511", "node": "151:528", "label": "Create Fundraiser", "action": "create-fundraiser", "hrefScreen": "151:530"},
  {"screen": "151:530", "node": "151:618", "label": "Manage", "action": "manage-fundraiser", "hrefScreen": "152:796"},
  {"screen": "155:1488", "node": "155:1548", "label": "Manage", "action": "manage-fundraiser", "hrefScreen": "152:796"},
  {"screen": "152:796", "node": "152:826", "label": "Edit Fundraiser", "action": "edit-fundraiser", "hrefScreen": "151:511"},
  {"screen": "152:796", "node": "152:828", "label": "Delete", "action": "delete-fundraiser", "hrefScreen": "151:530"},
  {"screen": "152:832", "node": "153:1119", "label": "View Applicant", "action": "view-applicant", "hrefScreen": "154:1229"},
  {"screen": "152:832", "node": "153:1215", "label": "View Applicant", "action": "view-applicant", "hrefScreen": "154:1229"},
  {"screen": "152:832", "node": "153:1117", "label": "Decline", "action": "decline-request"},
  {"screen": "152:832", "node": "153:1213", "label": "Decline", "action": "decline-request"},
  {"screen": "154:1229", "node": "154:1470", "label": "Accept", "action": "accept-request", "hrefScreen": "152:832"},
  {"screen": "154:1229", "node": "154:1468", "label": "Decline", "action": "decline-request", "hrefScreen": "152:832"}
];
const SUBMIT_DEFINITIONS = [
  {"screen": "47:39", "node": "47:71", "action": "login"},
  {"screen": "48:90", "node": "48:116", "action": "signup"},
  {"screen": "148:382", "node": "148:405", "action": "register-organization"},
  {"screen": "98:559", "node": "98:601", "action": "donate"},
  {"screen": "59:16", "node": "140:500", "action": "volunteer"},
  {"screen": "151:511", "node": "151:528", "action": "create-fundraiser"}
];

(function () {
  const screen = document.querySelector('.screen');
  if (!screen) return;
  const screenId = screen.dataset.screen;
  let routes = {};
  try { routes = JSON.parse(screen.dataset.routes || '{}'); } catch (_) { /* Plain links still work. */ }
  const storageKey = 'charigo-demo-v1';
  const initialState = {
    drafts: {}, donations: [], volunteerApplications: [], fundraisers: [],
    requests: [{ name: 'Maria Santos', status: 'Pending', location: 'Quezon City' },
      { name: 'Daniel Reyes', status: 'Pending', location: 'Pasig City' },
      { name: 'Gian Bernardino', status: 'Accepted', location: 'Manila' }],
    amount: 250, frequency: 'One Time', payment: 'GCash', anonymous: false,
    activeApplicant: 0, activeFundraiser: 0, editing: false, deletedFundraisers: []
  };
  let state = initialState;
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (stored && typeof stored === 'object') state = Object.assign(initialState, stored);
  } catch (_) { /* Browser privacy settings may block storage on file URLs. */ }
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) { /* In-memory demo continues. */ }
  }
  const sourceNodes = (id, root = screen) => Array.from(root.querySelectorAll('.fig-node[data-source="' + id + '"]'));
  const sourceNode = (id, root = screen) => sourceNodes(id, root)[0];
  const fieldById = id => document.querySelector('[data-field="' + id + '"]');
  function getValue(id) { const field = fieldById(id); return field ? field.value.trim() : ''; }
  function go(id) { if (routes[id]) window.location.href = routes[id]; }
  function sourceOf(element) {
    if (element.dataset.source) return element.dataset.source;
    const parent = element.closest('.fig-node');
    return parent ? parent.dataset.source : element.dataset.node;
  }
  function ancestorInstance(element, names) {
    for (let node = element; node && node !== screen; node = node.parentElement) {
      if (names.includes(node.dataset.source)) return node.dataset.source;
    }
    return null;
  }
  function back() {
    if (window.history.length > 1) window.history.back();
    else go(['151:472', '151:511', '152:796', '152:832', '154:1229', '155:1488'].includes(screenId) ? '151:530' : '59:6');
  }

  // The original glyphs remain visible until the user enters a value.
  function updatePlaceholder(field, definition) {
    const inputRect = field.getBoundingClientRect();
    const hide = document.activeElement === field || Boolean(field.value);
    field.classList.toggle('has-value', Boolean(field.value));
    screen.querySelectorAll('.source-text[data-text]').forEach(text => {
      if (text.dataset.text !== definition.placeholder) return;
      const original = text.closest('.fig-node') || text;
      const rect = original.getBoundingClientRect();
      if (rect.right > inputRect.left && rect.left < inputRect.right &&
          rect.bottom > inputRect.top && rect.top < inputRect.bottom) {
        original.style.visibility = hide ? 'hidden' : '';
      }
    });
  }
  // Dynamic values use the measured source text wrapper and its typography.
  function setText(node, value) {
    if (!node) return;
    const original = node.querySelector('.source-text');
    node.querySelectorAll(':scope > .art').forEach(art => { art.style.visibility = 'hidden'; });
    if (original && original !== node) { original.dataset.text = value; }
    node.dataset.text = value;
    let replacement = node.querySelector(':scope > .dynamic-value');
    if (!replacement) {
      replacement = document.createElement('span');
      replacement.className = 'dynamic-value';
      replacement.setAttribute('aria-hidden', 'true');
      replacement.style.cssText = 'position:absolute;inset:0;white-space:pre-wrap;font:inherit;color:inherit;text-align:inherit;line-height:inherit;pointer-events:none;';
      node.appendChild(replacement);
    }
    replacement.textContent = value;
    node.setAttribute('aria-label', value);
  }
  function setSourceText(id, value, root = screen) { setText(sourceNode(id, root), value); }

  const definitions = FIELD_DEFINITIONS.filter(field => field.screen === screenId);
  if (screenId === '98:559') {
    const sourceAmounts = { '111:324': 100, '98:573': 250, '111:343': 300, '111:361': 500, '111:378': 1500 };
    for (const [source, amount] of Object.entries(sourceAmounts)) if (sourceNode(source)) state.amount = amount;
    state.frequency = sourceNode('111:267') ? 'Monthly' : 'One Time';
    save();
  }
  definitions.forEach(definition => {
    const field = fieldById(definition.id);
    if (!field) return;
    if (definition.conditionSource && !sourceNode(definition.conditionSource)) { field.remove(); return; }
    if (definition.required) field.required = true;
    if (definition.min !== undefined) field.min = definition.min;
    if (definition.type === 'number') field.step = 'any';
    if (definition.inputmode) field.inputMode = definition.inputmode;
    if (definition.accept) field.accept = definition.accept;
    field.autocomplete = definition.type === 'password' ? 'off' : 'on';
    if (definition.type !== 'file' && definition.type !== 'password' && state.drafts[definition.id]) {
      field.value = state.drafts[definition.id];
    }
    function changed() {
      if (definition.type !== 'password' && definition.type !== 'file') {
        state.drafts[definition.id] = field.value;
        save();
      }
      field.setCustomValidity('');
      updatePlaceholder(field, definition);
      if (definition.id === 'search-charities') filterCategories(field.value);
      if (definition.id === 'donation-custom' && Number(field.value) > 0) { state.amount = Number(field.value); save(); }
    }
    field.addEventListener('input', changed);
    field.addEventListener('focus', () => updatePlaceholder(field, definition));
    field.addEventListener('blur', () => updatePlaceholder(field, definition));
    if (definition.type === 'file') {
      field.addEventListener('change', () => {
        const file = field.files && field.files[0];
        if (!file) return;
        if (definition.filenameNode) setSourceText(definition.filenameNode, file.name);
        if (!definition.previewNode || !file.type.startsWith('image/')) return;
        const node = sourceNode(definition.previewNode);
        if (!node) return;
        const preview = document.createElement('img');
        preview.alt = file.name;
        preview.src = URL.createObjectURL(file);
        preview.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit;';
        node.appendChild(preview);
        preview.addEventListener('load', () => URL.revokeObjectURL(preview.src), { once: true });
      });
    }
    updatePlaceholder(field, definition);
  });

  function validateForm() {
    const password = fieldById('signup-password');
    const confirmation = fieldById('signup-confirm');
    if (confirmation) confirmation.setCustomValidity(password.value === confirmation.value ? '' : 'Passwords must match.');
    for (const definition of definitions) {
      const field = fieldById(definition.id);
      if (!field) continue;
      if (definition.id.endsWith('-email') && field.value.trim()) {
        const text = field.value.trim();
        field.setCustomValidity(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || /^[+\d][\d\s()+-]{6,}$/.test(text)
          ? '' : 'Enter an email address or phone number.');
      }
      if (definition.id.endsWith('-date') && field.value.trim()) {
        const text = field.value.trim();
        const match = text.match(/^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/);
        let valid = false;
        if (match) {
          const month = Number(match[1]), day = Number(match[2]), year = Number(match[3]);
          const date = new Date(year, month - 1, day);
          valid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        }
        field.setCustomValidity(valid ? '' : 'Enter a valid date using MM / DD / YYYY.');
      }
      if (!field.reportValidity()) return false;
    }
    return true;
  }

  const categories = [
    { label: 'Animal Welfare', icons: ['75:138'], texts: ['75:141'] },
    { label: 'Children', icons: ['75:142'], texts: ['75:145'] },
    { label: 'Health', icons: ['75:149'], texts: ['75:152'] },
    { label: 'Education', icons: ['75:162', '75:179', '75:186', '75:192'], texts: ['75:165', '75:184', '75:191', '75:197'] },
    { label: 'Hunger & Poverty', icons: ['75:199'], texts: ['75:202'] },
    { label: 'Environment', icons: ['75:204'], texts: ['75:207'] }
  ];
  function filterCategories(query) {
    const term = query.trim().toLocaleLowerCase();
    categories.forEach(category => {
      const visible = category.label.toLocaleLowerCase().includes(term);
      [...category.icons, ...category.texts].forEach(id => sourceNodes(id).forEach(node => { node.style.visibility = visible ? '' : 'hidden'; }));
    });
  }
  function choosePayment(source, payment) {
    const selected = sourceNode('98:588');
    const row = sourceNode(source);
    if (selected && row) row.appendChild(selected); // Move the exact source check artwork.
    state.payment = payment;
    save();
  }
  function chooseAnonymous() {
    state.anonymous = !state.anonymous;
    save();
    const box = sourceNode('98:599');
    if (!box) return;
    box.setAttribute('aria-checked', String(state.anonymous));
    const existing = box.querySelector('.anonymous-check');
    if (existing) existing.remove();
    if (state.anonymous) {
      const sourceCheck = sourceNode('98:589');
      if (sourceCheck) {
        const check = sourceCheck.cloneNode(true);
        check.classList.add('anonymous-check');
        check.style.transform = 'translate(2px, 6px)';
        check.style.pointerEvents = 'none';
        box.appendChild(check);
      }
    }
  }

  screen.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => event.preventDefault()));

  function handleSubmit(action) {
    if (!validateForm()) return false;
    if (action === 'signup') state.accountName = getValue('signup-name');
    if (action === 'register-organization') {
      state.organization = { name: getValue('organization-name'), date: getValue('organization-date'), about: getValue('organization-about'), mission: getValue('organization-mission') };
    }
    if (action === 'donate') {
      state.donations.push({ amount: state.amount, frequency: state.frequency, payment: state.payment,
        anonymous: state.anonymous, date: new Date().toISOString(), reference: String(Date.now()) });
    }
    if (action === 'volunteer') state.volunteerApplications.push({ title: 'Dinner for the Unhoused', date: new Date().toISOString() });
    if (action === 'create-fundraiser') {
      const entry = { title: getValue('fundraiser-title'), goal: getValue('fundraiser-goal'), date: getValue('fundraiser-date'), about: getValue('fundraiser-about'), impact: getValue('fundraiser-impact') };
      if (state.editing) state.fundraisers[state.activeFundraiser] = entry;
      else { state.fundraisers.push(entry); state.activeFundraiser = state.fundraisers.length - 1; }
      state.deletedFundraisers = state.deletedFundraisers.filter(index => index !== state.activeFundraiser);
      state.editing = false;
    }
    save();
    return true;
  }

  function applicantIndex(element) {
    const instance = ancestorInstance(element, ['153:945', '153:1182', '153:1193']);
    return instance === '153:1182' ? 1 : instance === '153:1193' ? 2 : 0;
  }
  function updateRequests() {
    ['153:945', '153:1182', '153:1193'].forEach((id, index) => {
      const card = sourceNode(id);
      if (!card) return;
      if (state.requests[index].status === 'Declined') { card.style.visibility = 'hidden'; return; }
      if (state.requests[index].status === 'Accepted' && index < 2) {
        const badge = sourceNode('153:1112', card);
        const accepted = sourceNode('153:1208');
        if (badge && accepted) {
          const copy = accepted.cloneNode(true);
          copy.dataset.source = '153:1112';
          badge.replaceWith(copy);
        }
      }
    });
    if (state.requests.some((request, index) => request.status !== (index === 2 ? 'Accepted' : 'Pending'))) {
      setSourceText('152:840', state.requests.filter(request => request.status === 'Pending').length + ' pending requests');
    }
  }

  function performAction(action, definition, element) {
    switch (action) {
      case 'back': back(); return false;
      case 'toggle-password': {
        const field = fieldById(definition.field);
        if (field) field.type = field.type === 'password' ? 'text' : 'password';
        element.setAttribute('aria-pressed', String(field && field.type === 'text'));
        return false;
      }
      case 'filter-all': {
        const field = fieldById('search-charities');
        if (field) { field.value = ''; state.drafts['search-charities'] = ''; updatePlaceholder(field, definitions.find(item => item.id === 'search-charities')); }
        filterCategories(''); save(); return false;
      }
      case 'filter-verified':
        // The exported Search screen contains category choices, with no unverified result cards.
        // Preserve that source inventory instead of inventing search result designs.
        element.setAttribute('aria-pressed', element.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        return false;
      case 'filter-category': {
        const field = fieldById('search-charities');
        if (field) { field.value = definition.category; state.drafts['search-charities'] = field.value; updatePlaceholder(field, definitions.find(item => item.id === 'search-charities')); }
        filterCategories(definition.category); save(); return false;
      }
      case 'select-payment': choosePayment(definition.node, definition.payment); return false;
      case 'toggle-anonymous': chooseAnonymous(); return false;
      case 'create-fundraiser': return handleSubmit(action);
      case 'manage-fundraiser': {
        const instance = ancestorInstance(element, ['151:629', '151:641', '151:656']);
        state.activeFundraiser = instance === '151:641' ? 1 : instance === '151:656' ? 2 : 0;
        save(); return true;
      }
      case 'edit-fundraiser': state.editing = true; save(); return true;
      case 'delete-fundraiser':
        if (!window.confirm('Delete Fundraiser?')) return false;
        state.deletedFundraisers.push(state.activeFundraiser);
        if (state.fundraisers[state.activeFundraiser]) state.fundraisers.splice(state.activeFundraiser, 1);
        state.editing = false; save(); return true;
      case 'view-applicant': state.activeApplicant = applicantIndex(element); save(); return true;
      case 'accept-request': state.requests[state.activeApplicant].status = 'Accepted'; save(); return true;
      case 'decline-request': {
        if (!window.confirm('Decline?')) return false;
        const index = screenId === '152:832' ? applicantIndex(element) : state.activeApplicant;
        state.requests[index].status = 'Declined'; save();
        if (screenId === '152:832') { updateRequests(); return false; }
        return true;
      }
      default: return true;
    }
  }

  screen.addEventListener('click', event => {
    const element = event.target.closest('.hotspot, [data-action]');
    if (!element) return;
    const source = sourceOf(element);
    const parent = element.closest('.fig-node');
    const name = parent ? parent.dataset.name || '' : '';
    if (element.dataset.connection === 'BACK') { event.preventDefault(); back(); return; }
    // Component changes are ordinary links to their exact exported variants.
    if (name.startsWith('Amount / ')) {
      const label = name.slice(9);
      if (label !== 'Custom') state.amount = Number(label.replace(/[^\d.]/g, ''));
      save();
    }
    if (name === 'One Time' || name === 'Monthly') { state.frequency = name; save(); }
    const submit = SUBMIT_DEFINITIONS.find(item => item.screen === screenId && item.node === source);
    if (submit && !handleSubmit(submit.action)) { event.preventDefault(); return; }
    const definition = ACTION_DEFINITIONS.find(item => item.screen === screenId && item.node === source);
    if (definition && definition.action) {
      if (!(submit && submit.action === definition.action) && !performAction(definition.action, definition, element)) {
        event.preventDefault(); return;
      }
      if (definition.hrefScreen && (!element.getAttribute('href') || element.getAttribute('href') === '#')) {
        event.preventDefault(); go(definition.hrefScreen);
      }
    }
    if (element.dataset.navigation === 'SWAP_STATE' && element.getAttribute('href')) {
      event.preventDefault();
      window.location.replace(element.href);
    }
  });
  // Enter submits the corresponding existing primary button without adding new UI.
  screen.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.target.tagName === 'TEXTAREA' || event.target.type === 'file') return;
    if (!event.target.matches('[data-field]')) return;
    if (event.target.type === 'search') { event.preventDefault(); filterCategories(event.target.value); return; }
    const submit = SUBMIT_DEFINITIONS.find(item => item.screen === screenId);
    if (!submit) return;
    const node = sourceNode(submit.node);
    const link = node && node.querySelector('.hotspot');
    if (link) { event.preventDefault(); link.click(); }
  });

  // Apply mock state only after a user has changed it. The first visit matches the source exactly.
  if (screenId === '98:559') {
    if (state.payment !== 'GCash') {
      const definition = ACTION_DEFINITIONS.find(item => item.action === 'select-payment' && item.payment === state.payment);
      if (definition) choosePayment(definition.node, definition.payment);
    }
    if (state.anonymous) { state.anonymous = false; chooseAnonymous(); }
  }
  if (screenId === '59:8' && getValue('search-charities')) filterCategories(getValue('search-charities'));
  if (screenId === '59:14' && state.donations.length) {
    const donation = state.donations[state.donations.length - 1];
    setSourceText('59:42', '₱' + donation.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 }));
    setSourceText('59:44', new Date(donation.date).toLocaleDateString('en-US'));
    setSourceText('59:46', donation.reference);
  }
  if (screenId === '151:511' && state.editing) {
    const entry = state.fundraisers[state.activeFundraiser] || { title: state.activeFundraiser === 0 ? 'Bawat Batang Pinoy Malusog' : 'Your Fundraiser Here', goal: '30000', date: '10 / 24 / 2026', about: 'Provide nutritious meals and community support for children facing food insecurity.', impact: '' };
    for (const [key, value] of Object.entries(entry)) {
      const field = fieldById('fundraiser-' + key);
      const definition = definitions.find(item => item.id === 'fundraiser-' + key);
      if (field && definition) { field.value = value; updatePlaceholder(field, definition); }
    }
  }
  if (screenId === '151:530') {
    state.deletedFundraisers.forEach(index => {
      const node = sourceNode(['151:629', '151:641', '151:656'][index]);
      if (node) node.style.visibility = 'hidden';
    });
    state.fundraisers.slice(0, 3).forEach((entry, index) => {
      const card = sourceNode(['151:629', '151:641', '151:656'][index]);
      if (card && entry) setSourceText('151:611', entry.title, card);
    });
  }
  if (screenId === '152:796' && state.fundraisers[state.activeFundraiser]) {
    const entry = state.fundraisers[state.activeFundraiser];
    setSourceText('152:883', entry.title);
    setSourceText('152:818', entry.date);
    setSourceText('152:822', '₱' + Number(entry.goal).toLocaleString('en-PH'));
    setSourceText('152:824', entry.about);
  }
  if (screenId === '147:260' && state.donations.length) {
    const latest = state.donations[state.donations.length - 1];
    const card = sourceNode('147:274');
    setSourceText('147:246', '₱' + latest.amount.toLocaleString('en-PH'), card || screen);
    setSourceText('147:249', new Date(latest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), card || screen);
    setSourceText('147:269', '₱' + (1500 + state.donations.reduce((sum, donation) => sum + Number(donation.amount), 0)).toLocaleString('en-PH'));
    setSourceText('147:270', 'Across ' + (3 + state.donations.length) + ' donations');
  }
  if (screenId === '147:277' && state.volunteerApplications.length) {
    const latest = state.volunteerApplications[state.volunteerApplications.length - 1];
    const card = sourceNode('147:291');
    setSourceText('147:253', latest.title, card || screen);
    setSourceText('147:254', 'Iwas Gutom Society', card || screen);
    setSourceText('147:255', 'Manila', card || screen);
    setSourceText('147:257', new Date(latest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), card || screen);
    setSourceText('147:259', 'Pending', card || screen);
    setSourceText('147:286', String(3 + state.volunteerApplications.length));
  }
  if (screenId === '152:832') updateRequests();
  if (screenId === '154:1229' && state.activeApplicant !== 0) {
    const applicant = state.requests[state.activeApplicant];
    setSourceText('154:1233', applicant.name);
    setSourceText('154:1232', applicant.name.split(' ').map(part => part[0]).join(''));
    setSourceText('154:1245', applicant.location);
  }
})();
