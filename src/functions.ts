export function HealthInsurance(codconvenio: number): number {
  let response = 0;
  if (codconvenio === 2) {
    response = 44;
  } else if (codconvenio === 3) {
    response = 45;
  } else if (codconvenio === 4) {
    response = 43;
  } else if (codconvenio === 5) {
    response = 46;
  } else if (codconvenio === 6) {
    response = 47;
  } else if (codconvenio === 7) {
    response = 48;
  } else if (codconvenio === 8) {
    response = 55;
  } else if (codconvenio === 9) {
    response = 56;
  } else if (codconvenio === 10) {
    response = 61;
  } else if (codconvenio === 11) {
    response = 62;
  } else {
    response = codconvenio;
  }
  return response;
}
export function MedicalProcedure(codConvenio: number): number {
  let response = 0;

  if (codConvenio === 1) {
    response = 1;
  }
  if (codConvenio === 2) {
    response = 3;
  }
  if (codConvenio === 3) {
    response = 7;
  }
  if (codConvenio === 4) {
    response = 46;
  }
  if (codConvenio === 5) {
    response = 8;
  }

  if (codConvenio === 6) {
    response = 8;
  }
  if (codConvenio === 7) {
    response = 9;
  }
  if (codConvenio === 8) {
    response = 10;
  }
  if (codConvenio === 9) {
    response = 11;
  }
  if (codConvenio === 10) {
    response = 12;
  }

  if (codConvenio === 11) {
    response = 13;
  }
  if (codConvenio === 63) {
    response = 14;
  }
  return response;
}
