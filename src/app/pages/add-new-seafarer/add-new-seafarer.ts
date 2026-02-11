import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeafarerService } from '../../services/seafarer/seafarer.service';
import { GetAllSeafarersService } from '../../services/getAllSeafarers/get-all-seafarers-service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-new-seafarer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-seafarer.html',
  styleUrl: './add-new-seafarer.css',
})
export class AddNewSeafarer implements OnInit {
  http = inject(HttpClient) ;
  private fb = inject(FormBuilder);
   seafarerService = inject(SeafarerService);
  private getAllService = inject(GetAllSeafarersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  

  employees = signal<any[]>([]);
  sponsors = signal<any[]>([]);
  isEditMode = signal(false);
  editId = signal<number>(0);
  isLoading = signal(false);
  isSaving = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  // Store the original seafarer data for display (read-only info card)
  editSeafarerInfo = signal<any>(null);

  seafarerForm = this.fb.group({
    // Main entity fields
    EmpId: [null as number | null, Validators.required],
    VisaSponsorId: [null as number | null, Validators.required],
    PassPortIssueDate: [''],
    IDExPiryDate: [''],
    SeamanBookNO: [''],
    Remarks: [''],
    VisaIssueDate: [''],
    VisaExpiryDate: [''],
    NameOfSpouse: [''],
    NoOfChildren: [0],
    BodyWeight: [0],
    Height: [0],
    VisaUAEIdNO: [''],
    NearestAirport: [''],
    ResidenceNumber: [''],
    SkypeID: [''],
    PermanentAddressHomeCountry: [''],
    ContactNumberHomeCountry: [''],
    ContactNameAndNumberDuringEmergenciesUAE: [''],
    ContactNameAndNumberDuringEmergenciesHome: [''],
    SeamanIssueDate: [''],
    SeamanExpiryDate: [''],
    CicpaNO: [''],
    CicpaIssueDate: [''],
    CicpaExpiryDate: [''],
    Declaration: [''],

    // Boolean + Comment pairs
    SignedOffFromAShipDueToMedicalReason: [false],
    SignedOffFromAShipDueToMedicalReasonComment: [''],
    UndergoneAnyMdicalOperation: [false],
    UndergoneAnyMdicalOperationComment: [''],
    DoctorConsultation: [false],
    DoctorConsultationComment: [''],
    HealthOrDisabilityProblem: [false],
    HealthOrDisabilityProblemComment: [''],
    InquiryOrInvolvedMaritimeAccident: [false],
    InquiryOrInvolvedMaritimeAccidentComment: [''],
    LicenseSuspendedOrRevoked: [false],
    LicenseSuspendedOrRevokedComment: [''],
  });

  // Form Arrays
  qualifications = this.fb.array<FormGroup>([]);
  certificates = this.fb.array<FormGroup>([]);
  languages = this.fb.array<FormGroup>([]);
  references = this.fb.array<FormGroup>([]);
  workExperiences = this.fb.array<FormGroup>([]);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode.set(true);
      this.editId.set(+idParam);
      this.loadAllDataForEdit(+idParam);
    } else {
      this.loadDropdowns();
    }
  }

  loadDropdowns() {
    this.seafarerService.fillEmployee().subscribe({
      next: (data) => this.employees.set(data || []),
      error: (err) => console.error('FillEmployee failed', err)
    });
    this.seafarerService.fillVendor().subscribe({
      next: (data) => this.sponsors.set(data || []),
      error: (err) => console.error('FillVendor failed', err)
    });
  }

  // Load dropdowns AND seafarer data together so dropdowns are ready before patching
  loadAllDataForEdit(id: number) {
    this.isLoading.set(true);

    forkJoin({
      employees: this.seafarerService.fillEmployee(),
      sponsors: this.seafarerService.fillVendor(),
      allSeafarers: this.getAllService.getAllSeafarers()
    }).subscribe({
      next: ({ employees, sponsors, allSeafarers }) => {
        // Set dropdowns first
        this.employees.set(employees || []);
        this.sponsors.set(sponsors || []);

        // Find the seafarer to edit
        const seafarer = allSeafarers.find((s: any) => s.Id === id);
        if (seafarer) {
          // Store original info for the info card (grid-visible fields)
          this.editSeafarerInfo.set(seafarer);

          // Now patch the form — dropdowns are already loaded
          this.seafarerForm.patchValue({
            EmpId: seafarer.EmpId,
            VisaSponsorId: seafarer.VisaSponsorId,
            PassPortIssueDate: this.toDateInput(seafarer.PassPortIssueDate),
            IDExPiryDate: this.toDateInput(seafarer.IDExPiryDate),
            SeamanBookNO: seafarer.SeamanBookNO,
            Remarks: seafarer.Remarks,
            VisaIssueDate: this.toDateInput(seafarer.VisaIssueDate),
            VisaExpiryDate: this.toDateInput(seafarer.VisaExpiryDate),
            NameOfSpouse: seafarer.NameOfSpouse,
            NoOfChildren: seafarer.NoOfChildren || 0,
            BodyWeight: seafarer.BodyWeight || 0,
            Height: seafarer.Height || 0,
            VisaUAEIdNO: seafarer.VisaUAEIdNO,
            NearestAirport: seafarer.NearestAirport,
            ResidenceNumber: seafarer.ResidenceNumber,
            SkypeID: seafarer.SkypeID,
            PermanentAddressHomeCountry: seafarer.PermanentAddressHomeCountry,
            ContactNumberHomeCountry: seafarer.ContactNumberHomeCountry,
            ContactNameAndNumberDuringEmergenciesUAE: seafarer.ContactNameAndNumberDuringEmergenciesUAE,
            ContactNameAndNumberDuringEmergenciesHome: seafarer.ContactNameAndNumberDuringEmergenciesHome,
            SeamanIssueDate: this.toDateInput(seafarer.SeamanIssueDate),
            SeamanExpiryDate: this.toDateInput(seafarer.SeamanExpiryDate),
            CicpaNO: seafarer.CicpaNO,
            CicpaIssueDate: this.toDateInput(seafarer.CicpaIssueDate),
            CicpaExpiryDate: this.toDateInput(seafarer.CicpaExpiryDate),
            Declaration: seafarer.Declaration,
            SignedOffFromAShipDueToMedicalReason: seafarer.SignedOffFromAShipDueToMedicalReason || false,
            SignedOffFromAShipDueToMedicalReasonComment: seafarer.SignedOffFromAShipDueToMedicalReasonComment,
            UndergoneAnyMdicalOperation: seafarer.UndergoneAnyMdicalOperation || false,
            UndergoneAnyMdicalOperationComment: seafarer.UndergoneAnyMdicalOperationComment,
            DoctorConsultation: seafarer.DoctorConsultation || false,
            DoctorConsultationComment: seafarer.DoctorConsultationComment,
            HealthOrDisabilityProblem: seafarer.HealthOrDisabilityProblem || false,
            HealthOrDisabilityProblemComment: seafarer.HealthOrDisabilityProblemComment,
            InquiryOrInvolvedMaritimeAccident: seafarer.InquiryOrInvolvedMaritimeAccident || false,
            InquiryOrInvolvedMaritimeAccidentComment: seafarer.InquiryOrInvolvedMaritimeAccidentComment,
            LicenseSuspendedOrRevoked: seafarer.LicenseSuspendedOrRevoked || false,
            LicenseSuspendedOrRevokedComment: seafarer.LicenseSuspendedOrRevokedComment,
          });
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Load for edit failed', err);
        this.isLoading.set(false);
        this.errorMessage.set('Failed to load data for editing.');
      }
    });
  }

  private toDateInput(dateStr: string | null): string {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return '';
    }
  }

  // ---- Qualification helpers ----
  addQualification() {
    this.qualifications.push(this.fb.group({
      DegreeOrCourse: [''],
      CourseIssueDate: [''],
      ExpiryDate: [''],
      MajorOrSubject: [''],
      University: [''],
      Country: [''],
      Type: [1]
    }));
  }

  removeQualification(i: number) {
    this.qualifications.removeAt(i);
  }

  // ---- Certificate helpers ----
  addCertificate() {
    this.certificates.push(this.fb.group({
      Capacity: [''],
      Regulation: [''],
      IssueDate: [''],
      ExpiryDate: [''],
      IssuingAuthority: [''],
      Limitations: [''],
      Country: [''],
      Type: [1]
    }));
  }

  removeCertificate(i: number) {
    this.certificates.removeAt(i);
  }

  // ---- Language helpers ----
  addLanguage() {
    this.languages.push(this.fb.group({
      Capacity: [''],
      Regulation: [''],
      IssueDate: [''],
      ExpiryDate: [''],
      IssuingAuthority: [''],
      Limitations: [''],
      Country: ['']
    }));
  }

  removeLanguage(i: number) {
    this.languages.removeAt(i);
  }

  // ---- Reference helpers ----
  addReference() {
    this.references.push(this.fb.group({
      PersonName: [''],
      CompanyName: [''],
      Country: [''],
      Fax: [''],
      EmailId: ['']
    }));
  }

  removeReference(i: number) {
    this.references.removeAt(i);
  }

  // ---- Work Experience helpers ----
  addWorkExperience() {
    this.workExperiences.push(this.fb.group({
      VesselName: [''],
      VesselType: [''],
      Rank: [''],
      From: [''],
      To: [''],
      GRT: [''],
      BHP: [''],
      CompanyName: ['']
    }));
  }

  removeWorkExperience(i: number) {
    this.workExperiences.removeAt(i);
  }

  onSubmit() {
    this.successMessage.set('');
    this.errorMessage.set('');

    const formVal = this.seafarerForm.value;

    const entity: any = { ...formVal };

    // Convert numeric fields
    entity.NoOfChildren = Number(entity.NoOfChildren) || 0;
    entity.BodyWeight = Number(entity.BodyWeight) || 0;
    entity.Height = Number(entity.Height) || 0;
    entity.EmpId = Number(entity.EmpId);
    entity.VisaSponsorId = Number(entity.VisaSponsorId);

    // Convert booleans (null if false per API pattern)
    if (!entity.SignedOffFromAShipDueToMedicalReason) {
      entity.SignedOffFromAShipDueToMedicalReason = null;
      entity.SignedOffFromAShipDueToMedicalReasonComment = null;
    }
    if (!entity.UndergoneAnyMdicalOperation) {
      entity.UndergoneAnyMdicalOperation = null;
      entity.UndergoneAnyMdicalOperationComment = null;
    }
    if (!entity.DoctorConsultation) {
      entity.DoctorConsultation = null;
      entity.DoctorConsultationComment = null;
    }
    if (!entity.HealthOrDisabilityProblem) {
      entity.HealthOrDisabilityProblem = null;
      entity.HealthOrDisabilityProblemComment = null;
    }
    if (!entity.InquiryOrInvolvedMaritimeAccident) {
      entity.InquiryOrInvolvedMaritimeAccident = null;
      entity.InquiryOrInvolvedMaritimeAccidentComment = null;
    }
    if (!entity.LicenseSuspendedOrRevoked) {
      entity.LicenseSuspendedOrRevoked = null;
      entity.LicenseSuspendedOrRevokedComment = null;
    }

    // Set Id for edit mode
    if (this.isEditMode()) {
      entity.Id = this.editId();
    }

    const payload = {
      entity,
      Qualifications: this.qualifications.value,
      Certificates: this.certificates.value,
      Languages: this.languages.value,
      References: this.references.value,
      WorkExperiences: this.workExperiences.value
    };

    this.isSaving.set(true);
    this.seafarerService.saveSeafarer(payload).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMessage.set(this.isEditMode() ? 'Seafarer updated successfully!' : 'Seafarer saved successfully!');
        setTimeout(() => this.router.navigateByUrl('/home'), 1500);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set('Failed to save. Please check the data and try again.');
        console.error('Save failed:', err);
      }
    });
  }


  goBack() {
    this.router.navigateByUrl('/home');
  }
}
